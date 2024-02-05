"use client";

import { useTheme } from "next-themes";
import { SanityDocument } from "@sanity/client";
import { PortableText } from "@portabletext/react";
import { RichTextComponents } from "@/components/blog/post/rich-text";
import Comments from "@/components/blog/post/comments";
import PostHeader from "@/components/blog/post/post-header";
import { getPostCategories } from "@/lib/utils";
import MainImg from "@/components/blog/post/main-img";
import ScrollToTopButton from "@/components/shared/scroll-up";

export default function Post({
  post,
  locale,
}: {
  post: SanityDocument;
  locale?: string;
}) {
  const { theme } = useTheme();
  return (
    <div className="mt-12 flex-grow px-4 md:px-16 lg:px-32">
      <article>
        <PostHeader
          publishedAt={post.publishedAt}
          author={post.author}
          title={post.title}
          locale={locale!}
          categories={getPostCategories(post)}
        />
        {post?.mainImage ? <MainImg img={post.mainImage} /> : null}
        {post?.body ? (
          <div className="prose prose-xl md:prose-2xl lg:prose-xl my-4 mb-4 justify-center text-black dark:text-white">
            <PortableText value={post.body} components={RichTextComponents} />
          </div>
        ) : null}
        <Comments lang={locale} theme={theme} />
      </article>
      <ScrollToTopButton />
    </div>
  );
}
