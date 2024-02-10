import algoliasearch from "algoliasearch/lite";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import React from "react";
import { Configure, InfiniteHits, RefinementList } from "react-instantsearch";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import { SearchBox } from "@/components/blog/search/search-box";

// Dynamic import to avoid SSR issues with Algolia
const Hit = dynamic(
  () => import("@/components/blog/search/hit").then((mod) => mod.Hit),
  {
    ssr: false,
  },
) as React.FC<any>;

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!,
);

interface SearchProps {
  language: string;
}

/*
 * Search component for the blog
 * @param {string} language - The current language
 * @returns {JSX.Element} - The search component and list of articles
 */
export default function Search({ language }: SearchProps) {
  const t = useTranslations("Articles");
  const indexName = `${language}_articles`;

  return (
    <div className="grid grid-cols-7 gap-4 sm:grid-cols-12">
      <InstantSearchNext
        indexName={indexName}
        searchClient={client}
        future={{
          preserveSharedStateOnUnmount: true,
        }}
      >
        <div className="col-span-11 sm:col-span-9">
          <Configure hitsPerPage={12} />
          <SearchBox />
          <InfiniteHits
            hitComponent={Hit}
            classNames={{
              list: "grid grid-cols-1 gap-8",
              loadMore:
                "mt-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black px-4 py-2 rounded-md",
              disabledLoadMore:
                "hidden mt-4 bg-zinc-500 dark:bg-zinc-500 text-white dark:text-black px-4 py-2 rounded-md",
            }}
            translations={{
              showMoreButtonText: t("Load"),
            }}
            showPrevious={false}
          />
        </div>
        <div className="col-span-3 space-x-0">
          <h3 className="mb-2 text-xl font-semibold sm:sticky sm:top-20">
            {t("Filters")}
          </h3>
          <RefinementList
            attribute="categories"
            title="Categories"
            classNames={{
              root: "space-y-4 sm:sticky sm:top-28",
              list: "space-y-2",
              item: "flex items-center",
              label: "text-sm",
              checkbox: "mr-2",
              count:
                "ml-2 text-blue-600 text-sm rounded-full bg-blue-100 px-2 py-1 w-full text-center",
            }}
          />
        </div>
      </InstantSearchNext>
    </div>
  );
}
