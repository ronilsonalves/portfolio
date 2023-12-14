"use client";

import { useTheme } from "next-themes";
import { SanityDocument } from "@sanity/client";
import { PortableText } from "@portabletext/react";
import { RichTextComponents } from "@/components/blog/rich-text";
import Comments from "@/components/blog/comments";
import BlogHeader from "@/components/blog/blog-header";
import { getPostCategories } from "@/lib/utils";
import MainImg from "@/components/blog/main-img";

export default function Post({
  post,
  locale,
}: {
  post: SanityDocument;
  locale?: string;
}) {
  const { theme } = useTheme();
  return (
    <article className="mt-12 flex-grow px-4 md:px-16 lg:px-32">
      <BlogHeader
        publishedAt={post.publishedAt}
        author={post.author}
        title={post.title}
        locale={locale!}
        categories={getPostCategories(post)}
      />
      {post?.mainImage ? (
        <MainImg img={post.mainImage}/>
      ) : null}
      {post?.body ? (
        <div className="my-4 mb-4 prose prose-xl md:prose-2xl justify-center text-black dark:text-white">
          <PortableText value={post.body} components={RichTextComponents} />
        </div>
      ) : null}
      <Comments lang={locale} theme={theme} />
    </article>
  );
}