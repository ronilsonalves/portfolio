"use client";

import { SanityDocument } from "@sanity/client";
import { PageHeader } from "@/components/institutional/page-header";
import { CustomPortableText } from "@/components/shared/custom-portable-text";
import AboutBody from "@/components/institutional/about/body";
import ArticleList from "@/components/blog/listing/articles-list";
import ProjectsListing from "@/components/projects/listing";

export default function Page({
  page,
  locale,
  posts,
  projects,
}: {
  page: SanityDocument;
  locale?: string;
  posts?: SanityDocument[];
  projects?: SanityDocument[];
}) {
  return (
    <main className="justify-left mt-8 flex w-full flex-grow px-4 md:px-16 lg:px-32">
      <div className="mb-14 w-full">
        {/* Page header */}
        <PageHeader title={page.title} description={page.overview} />
        {/* Timeline */}
        {page?.timelines && <CustomPortableText value={page.timelines} />}
        {/* Body */}
        <div className="relative px-4 sm:px-8 lg:px-12" id="bodyContent">
          {/* About page body */}
          {page?.body && <AboutBody body={page.body} />}
        </div>
        {/* Blog page body */}
        {posts ? <ArticleList language={locale!} /> : null}
        {/* Projects page body */}
        {projects ? <ProjectsListing projects={projects} /> : null}
        {/* Services page body */}
      </div>
    </main>
  );
}
