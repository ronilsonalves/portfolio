import { NextRequest } from "next/server";
import algoliasearch from "algoliasearch";
import { createClient, type SanityDocumentStub, type SanityClient } from "@sanity/client";
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

const client = createClient({
  projectId: config.sanityProjectId!,
  dataset: config.sanityDataset!,
  token: config.sanityReadToken!,
  apiVersion: "2021-03-25",
  useCdn: false,
});

/**
 *  This function receives webhook POSTs from Sanity and updates, creates or
 *  deletes records in the corresponding Algolia indexes.
 * @param req - The NextRequest object.
 * @returns A response object.
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
    req.headers.get("Authorization")?.slice(7) !== config.sanityWebhookSecret
  ) {
    return new Response(
      JSON.stringify({
        message: "Unauthorized",
        details: "Invalid webhook token",
      }),
      { status: 401 }
    );
  }

  if (
    req.headers.get("Language") !== "en" &&
    req.headers.get("Language") !== "pt"
  ) {
    return new Response(
      JSON.stringify({
        message: "Bad request",
        details: "Invalid or missing language header",
      }),
      { status: 400 }
    );
  }

  console.info("Webhook received...");

  const algoliaIndex = algolia.initIndex(config.algoliaIndexName!);
  const algoliaPtIndex = algolia.initIndex(config.algoliaPtIndexName!);

  const sanityEn = initSanityAlgoliaIndexer("en", algoliaIndex);
  const sanityPt = initSanityAlgoliaIndexer("pt", algoliaPtIndex);

  const parsedWebhookBody = await req.body
    ?.getReader()
    .read()
    .then(({ value }) => {
      console.info("Parsing webhook body...");
      try {
        return JSON.parse(new TextDecoder().decode(value));
      } catch (err) {
        console.error("Error parsing webhook body", err);
        return { status: 400 };
      }
    });

  if (parsedWebhookBody?.status === 400) {
    return new Response(
      JSON.stringify({
        message: "Bad request",
        details: "Invalid webhook body",
      }),
      { status: 400 }
    );
  }

  switch (req.headers.get("Language")) {
    case "en":
      await synchAlgoliaIndex(sanityEn, client, parsedWebhookBody as WebhookBody);
      break;
    case "pt":
      await synchAlgoliaIndex(sanityPt, client, parsedWebhookBody as WebhookBody);
      break;
    default:
      return new Response(
        JSON.stringify({
          message: "Bad request",
          details: "Invalid or missing language header",
        }),
        { status: 400 }
      );
  }
}

/**
 * This function is used to index all documents in Sanity to Algolia for the first time.
 * @param req - The NextRequest object.
 * @returns A response object.
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

  const enAlgoliaIndexer = initSanityAlgoliaIndexer("en", algoliaIndex);
  const ptAlgoliaIndexer = initSanityAlgoliaIndexer("pt", algoliaPtIndex);

  const enIndexTask = client.fetch(query, { types }).then((ids) => {
    console.info("INFO: Indexing english articles...");
    enAlgoliaIndexer.webhookSync(client, {
      ids: { created: ids, updated: [], deleted: [] },
    });
  });

  const ptIndexTask = client.fetch(queryPt, { types }).then((ids) => {
    console.info("INFO: Indexing portuguese articles...");
    ptAlgoliaIndexer.webhookSync(client, {
      ids: { created: ids, updated: [], deleted: [] },
    });
  });

  await Promise.all([enIndexTask, ptIndexTask]).catch((err) => {
    console.error("ERROR: Something went wrong", err);
    return new Response(
      JSON.stringify({
        message: "Something went wrong",
        details: err,
      }),
      { status: 500 }
    );
  });

  return new Response(
    JSON.stringify({
      message: "Success",
    }),
    { status: 200 }
  );
}

/**
 * Initializes the Sanity Algolia index.
 *
 * @param language - The language of the index.
 * @param algoliaIndexName - The name of the Algolia index.
 * @returns The indexer function.
 */
function initSanityAlgoliaIndexer(language: string, algoliaIndexName: any) {
  return indexer(
    {
      post: {
        index: algoliaIndexName,
        projection: `{
          title,
          summary,
          "slug": slug.current,
          "body": pt::text(body)
        }`,
      },
    },
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
}

/**
 * Syncs the Algolia index with the Sanity documents.
 *
 * @param indexed - The indexer function.
 * @param client - The Sanity client.
 * @param body - The webhook body.
 * @returns A response object.
 */
async function synchAlgoliaIndex(indexed: any, client: SanityClient, body: WebhookBody) {
  await indexed.webhookSync(client, body).then(() => {
    console.info("Webhook synced successfully!");
    return new Response(
      JSON.stringify({
        message: "Success",
      }),
      { status: 200 }
    );
  }).catch((err: any) => {
    return new Response(
      JSON.stringify({
        message: "Something went wrong",
        details: err,
      }),
      { status: 500 }
    );
  });
}