"use client";

import { SanityDocument } from "@sanity/client";
import { PageHeader } from "@/components/institutional/page-header";
import { CustomPortableText } from "@/components/shared/custom-portable-text";
import AboutBody from "@/components/institutional/about/body";
import ArticlesList from "@/components/institutional/blog/articles-list";

export default function Page({
  page,
  locale,
  posts,
  categories,
}: {
  categories?: SanityDocument[];
  page: SanityDocument;
  locale?: string;
  posts?: SanityDocument[];
}) {
  return (
    <main className="mt-8 flex flex-grow justify-left px-4 md:px-16 lg:px-32">
      <div className="mb-14">
        {/* Page header */}
        <PageHeader title={page.title} description={page.overview} />
        {/* Timeline */}
        {page?.timelines && <CustomPortableText value={page.timelines} />}
        {/* Body */}
        <div className="relative px-4 sm:px-8 lg:px-12" id="bodyContent">
          {/* About page body */}
          {page?.body ? <AboutBody body={page.body} /> : null}

          {/* Projects page body */}

          {/* Services page body */}

          {/* Privacy page body */}
        </div>
        {/* Blog page body */}
        {posts ? (
          <ArticlesList
            posts={posts}
            language={locale!}
            categories={categories}
          />
        ) : null}
      </div>
    </main>
  );
}
