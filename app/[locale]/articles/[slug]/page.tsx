import {SanityDocument} from "@sanity/client";
import Post from "./components/post";
import {postQuery} from "@/sanity/lib/queries";
import {sanityFetch} from "@/sanity/lib/fetch";
import {notFound} from "next/navigation";
import {Metadata} from "next";
import {toPlainText} from "@portabletext/react";
import {getPostCategories} from "@/lib/utils";

export async function generateMetadata({params: {slug, locale}}: {params: {slug: string, locale: string}}): Promise<Metadata> {
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: `Article not found - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      description: `Sorry, we couldn't find the article you were looking for.`,
      openGraph: {
        title: `Article not found - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
        description: `Sorry, we couldn't find the article you were looking for.`,
      }
    }
  }
  
  const languages = post?._translations?.filter(
    (translation: any) => translation !== undefined
  )
  
  const categories = getPostCategories(post)
  
  const en = languages.filter((language: any) => language?.language === "en");
  const pt = languages.filter((language: any) => language?.language === "pt");
  
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://www.ronilsonalves.com"
    ),
    alternates: {
      canonical:
        locale === "en" ? "/articles/" + slug : "/pt/articles/" + slug,
      languages: {
        en: en.length > 0 ? "/articles/" + en[0].slug.current : "/",
        pt: pt.length > 0 ? "/pt/articles/" + pt[0].slug.current : "/pt",
      },
    },
    title: post.title + " – Ronilson Alves",
    description: toPlainText(post.summary),
    keywords: categories?.join(", "),
    openGraph: {
      type: "article",
      locale: locale,
      url: locale === "en" ? "/articles/" + slug : "/pt/articles/" + slug,
      siteName: "Ronilson Alves – Software Developer",
      title: post.title + " – " + process.env.NEXT_PUBLIC_SITE_NAME,
      images: [
        {
          url: post.mainImage?.asset.url,
          width: 1200,
          height: 630,
          alt: post.mainImage?.alt || post.title,
        },
      ],
  }}
}

async function getPostBySlug(slug: string) {
  return await sanityFetch<SanityDocument>({
    query: postQuery,
    params: {slug},
  });
}

export default async function ArticlePage({params: {locale,slug}}: {params: {locale: string, slug: string}}) {
    const post = await getPostBySlug(slug);

    if (!post) {
      return notFound();
    }

    return <Post post={post} locale={locale} />;
}