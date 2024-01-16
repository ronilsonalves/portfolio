import { NextRequest } from "next/server";
import algoliasearch from "algoliasearch";
import { createClient, type SanityDocumentStub } from "@sanity/client";
// TODO: Use the client from the lib folder
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/fetch";
import indexer from "sanity-algolia";
import { WebhookBody } from "sanity-algolia/dist/types";

const config = {
  algoliaAdminApiKey: process.env.ALGOLIA_ADMIN_API_KEY,
  algoliaApplicationId: process.env.ALGOLIA_APP_ID,
  algoliaPtIndexName: process.env.ALGOLIA_PT_INDEX_NAME,
  algoliaIndexName: process.env.ALGOLIA_INDEX_NAME,
  sanityProjectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  sanityDataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  sanityReadToken: process.env.SANITY_API_TOKEN,
  sanityWebhookSecret: process.env.SANITY_WEBHOOK_SECRET,
};

const types = ["post"];
const query = `*[_type == "post" && defined(slug.current) &&!(_id in path("drafts.**")) && language == "en"][]._id`;
const queryPt = `*[_type == "post" && defined(slug.current) &&!(_id in path("drafts.**")) && language == "pt"][]._id`;

const algolia = algoliasearch(
  config.algoliaApplicationId!,
  config.algoliaAdminApiKey!
);

const sanity = createClient({
  projectId: config.sanityProjectId!,
  dataset: config.sanityDataset!,
  token: config.sanityReadToken!,
  apiVersion: "2021-03-25",
  useCdn: false,
});

/**
 *  This function receives webhook POSTs from Sanity and updates, creates or
 *  deletes records in the corresponding Algolia indices.
 */
export async function POST(req: NextRequest) {
  // Tip: Add webhook secrets to verify that the request is coming from Sanity.
  // See more at: https://www.sanity.io/docs/webhooks#bfa1758643b3
  if (req.headers.get("content-type") !== "application/json") {
    return new Response(
      JSON.stringify({
        message: "Bad request",
        details: "Content-type must be application/json",
      }),
      { status: 400 }
    );
  }

  if (
    req.headers.get("x-sanity-webhook-token") !== config.sanityWebhookSecret
  ) {
    return new Response(
      JSON.stringify({
        message: "Unauthorized",
        details: "Invalid webhook token",
      }),
      { status: 401 }
    );
  }

  // Configure this to match an existing Algolia index name
  const algoliaIndex = algolia.initIndex(config.algoliaIndexName!);

  const sanityAlgolia = indexer(
    // The first parameter maps a Sanity document type to its respective Algolia
    // search index. In this example both `post` and `article` Sanity types live
    // in the same Algolia index. Optionally you can also customize how the
    // document is fetched from Sanity by specifying a GROQ projection.
    //
    // In this example we fetch the plain text from Portable Text rich text
    // content via the pt::text function.
    //
    // _id and other system fields are handled automatically.
    {
      post: {
        index: algoliaIndex,
        projection: `{
          title,
          "path": slug.current,
          "body": pt::text(body)
        }`,
      },
      // For the article document in this example we want to resolve a list of
      // references to authors and get their names as an array. We can do this
      // directly in the GROQ query in the custom projection.
      article: {
        index: algoliaIndex,
        projection: `{
          title,
          summary,
          "slug": slug.current,
          "body": pt::text(body)
        }`,
      },
    },

    // The second parameter is a function that maps from a fetched Sanity document
    // to an Algolia Record. Here you can do further mutations to the data before
    // it is sent to Algolia.
    (document: SanityDocumentStub) => {
      switch (document._type) {
        case "post":
          return {
            title: document.title,
            summary: document.summary,
            slug: document.slug,
            body: document.body,
          };
        default:
          return document;
      }
    },
    // Visibility function (optional).
    //
    // The third parameter is an optional visibility function. Returning `true`
    // for a given document here specifies that it should be indexed for search
    // in Algolia. This is handy if for instance a field value on the document
    // decides if it should be indexed or not. This would also be the place to
    // implement any `publishedAt` datetime visibility rules or other custom
    // visibility scheme you may be using.
    (document: SanityDocumentStub) => {
      if (document.hasOwnProperty("isHidden")) {
        return !document.isHidden;
      }
      return true;
    }
  );

  const parsedWebhookBody = await req.body
    ?.getReader()
    .read()
    .then(({ value }) => {
      console.log(value);
      return JSON.parse(new TextDecoder().decode(value));
    });

  // Finally connect the Sanity webhook payload to Algolia indices via the
  // configured serializers and optional visibility function. `webhookSync` will
  // inspect the webhook payload, make queries back to Sanity with the `sanity`
  // client and make sure the algolia indices are synced to match.
  sanityAlgolia
    .webhookSync(sanity, parsedWebhookBody as WebhookBody)
    .then(() => {
      return new Response(
        JSON.stringify({
          message: "Success",
        }),
        { status: 200 }
      );
    })
    .catch((err) => {
      return new Response(
        JSON.stringify({
          message: "Something went wrong",
          details: err,
        }),
        { status: 500 }
      );
    });
}

/**
 * This function is used to index all documents in Sanity to Algolia for the first time.
 * @param req 
 * @returns 
 */
export async function GET(req: NextRequest) {
  if (
    req.headers.get("x-sanity-webhook-token") !== config.sanityWebhookSecret
  ) {
    return new Response(
      JSON.stringify({
        message: "Unauthorized",
      }),
      { status: 401 }
    );
  }

  const algoliaIndex = algolia.initIndex(config.algoliaIndexName!);
  const algoliaPtIndex = algolia.initIndex(config.algoliaPtIndexName!);

  const enAlgoliaIndexer = indexer(
    // The first parameter maps a Sanity document type to its respective Algolia
    // search index. In this example both `post` and `article` Sanity types live
    // in the same Algolia index. Optionally you can also customize how the
    // document is fetched from Sanity by specifying a GROQ projection.
    //
    // In this example we fetch the plain text from Portable Text rich text
    // content via the pt::text function.
    //
    // _id and other system fields are handled automatically.
    {
      post: {
        index: algoliaIndex,
        projection: `{
          title,
          summary,
          "slug": slug.current,
          "body": pt::text(body)
        }`,
      },
    },

    // The second parameter is a function that maps from a fetched Sanity document
    // to an Algolia Record. Here you can do further mutations to the data before
    // it is sent to Algolia.
    (document: SanityDocumentStub) => {
      switch (document._type) {
        case "post":
          return {
            title: document.title,
            summary: document.summary,
            slug: document.slug,
            body: document.body,
          };
        default:
          return document;
      }
    }
  );

  const ptAlgoliaIndexer = indexer(
    // The first parameter maps a Sanity document type to its respective Algolia
    // search index. In this example both `post` and `article` Sanity types live
    // in the same Algolia index. Optionally you can also customize how the
    // document is fetched from Sanity by specifying a GROQ projection.
    //
    // In this example we fetch the plain text from Portable Text rich text
    // content via the pt::text function.
    //
    // _id and other system fields are handled automatically.
    {
      post: {
        index: algoliaPtIndex,
        projection: `{
          title,
          "summary": pt::text(summary),
          "slug": slug.current,
          "body": pt::text(body)
        }`,
      },
    },

    // The second parameter is a function that maps from a fetched Sanity document
    // to an Algolia Record. Here you can do further mutations to the data before
    // it is sent to Algolia.
    (document: SanityDocumentStub) => {
      console.log(document);
      return {
        ...document,
        ObjectID: document._id,
      };
    }
  );

  await sanity.fetch(query, { types }).then((ids) => {
    console.log("Indexing english articles...");
    enAlgoliaIndexer
      .webhookSync(sanity, {
        ids: { created: ids, updated: [], deleted: [] },
      })
  });

  await sanity.fetch(queryPt, { types }).then((ids) => {
    console.log("Indexing portuguese articles...");
    ptAlgoliaIndexer
      .webhookSync(sanity, {
        ids: { created: ids, updated: [], deleted: [] },
      })
  });

  return new Response(
    JSON.stringify({
      message: "Success",
    }),
    { status: 200 }
  );
}
