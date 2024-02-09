"use client";

import { useTheme } from "next-themes";
import { SanityDocument } from "@sanity/client";
import Comments from "@/components/blog/post/comments";
import PostHeader from "@/components/blog/post/header";
import PostBody from "@/components/blog/post/body";
import { getPostCategories } from "@/lib/utils";
import ScrollToTopButton from "@/components/shared/scroll-up";
import TableOfContents from "@/components/blog/post/table-of-contents";

interface PostRendererProps {
  post: SanityDocument;
  locale?: string;
}

export default function PostRenderer({ post, locale }: PostRendererProps) {
  const { theme } = useTheme();
  const categories = getPostCategories(post);
  const { title, mainImage, body, publishedAt, author, slug } = post;
  return (
    <article className="mt-8 flex w-full flex-col items-center justify-center px-4 md:mt-12 md:px-16 lg:px-32">
      <PostHeader
        title={title}
        publishedAt={publishedAt}
        author={author}
        categories={categories}
        coverImage={mainImage}
        locale={locale!}
      />
      {/* Body post content & sidebar with Table of contents */}
      <div className="grid max-w-6xl grid-flow-row grid-cols-12 gap-1 md:grid-flow-col">
        <PostBody body={body} />
        <TableOfContents slug={slug} locale={locale!} body={body} />
      </div>
      {/* Comments */}
      <div className="w-full">
        <Comments lang={locale} theme={theme} />
      </div>
      {/* Scroll to top button */}
      <ScrollToTopButton />
    </article>
  );
}
