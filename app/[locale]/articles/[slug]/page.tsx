import PostRenderer from "@/components/blog/post/page";
import { getPostCategories } from "@/lib/utils";
import { sanityFetch } from "@/sanity/lib/fetch";
import { urlForOpenGraphImage } from "@/sanity/lib/image";
import { postQuery } from "@/sanity/lib/queries";
import { SanityDocument } from "@sanity/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params: { slug, locale },
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: `Article not found - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      description: `Sorry, we couldn't find the article you were looking for.`,
      openGraph: {
        title: `Article not found - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
        description: `Sorry, we couldn't find the article you were looking for.`,
      },
    };
  }

  const translations = post?._translations?.filter(
    (translation: any) => translation !== undefined,
  );

  const categories = getPostCategories(post);

  const en = translations.filter(
    (translation: any) => translation?.language === "en",
  );
  const pt = translations.filter(
    (translation: any) => translation?.language === "pt",
  );

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://www.ronilsonalves.com",
    ),
    alternates: {
      canonical: locale === "en" ? "/articles/" + slug : "/pt/artigos/" + slug,
      languages: {
        en: en.length > 0 ? "/articles/" + en[0].slug.current : "/",
        pt: pt.length > 0 ? "/pt/artigos/" + pt[0].slug.current : "/pt",
      },
    },
    title: post.title + " - Ronilson Alves",
    description: post.summary,
    keywords: categories?.join(", "),
    openGraph: {
      type: "article",
      locale: locale,
      url: locale === "en" ? "/articles/" + slug : "/pt/artigos/" + slug,
      description: post.summary,
      siteName: "Ronilson Alves – Software Developer",
      title: post.title + " – " + process.env.NEXT_PUBLIC_SITE_NAME,
      images: [
        {
          url: urlForOpenGraphImage(post.mainImage)!,
          width: 1200,
          height: 627,
          alt: post.mainImage?.alt || post.title,
        },
      ],
    },
  };
}

async function getPostBySlug(slug: string) {
  return await sanityFetch<SanityDocument>({
    query: postQuery,
    params: { slug },
  });
}

export default async function ArticlePage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  return <PostRenderer post={post} locale={locale} />;
}
