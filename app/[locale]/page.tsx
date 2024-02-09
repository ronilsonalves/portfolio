import { lazy } from "react";
import { SanityDocument } from "next-sanity";
import { postsByLangQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import { getTranslations } from "next-intl/server";

const Hero = lazy(() => import("@/components/home/hero"));
const Articles = lazy(() => import("@/components/home/articles"));
const Photos = lazy(() => import("@/components/home/photos"));

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  //@ts-ignore
  const t = await getTranslations("Metadata.Home");
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://www.ronilsonalves.com",
    ),
    alternates: {
      canonical: locale === "en" ? "/" : "/pt",
      languages: {
        en: "/",
        pt: "/pt",
      },
    },
    title: t("title"),
    description: t("description"),
    openGraph: {
      type: "website",
      locale: locale,
      url: locale === "en" ? "/" : "/pt",
      siteName: t("title"),
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: "https://c.ronilsonalves.com/images/og.svg",
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
  };
}

async function getLatestFivePostsByLocale(language: string) {
  return await sanityFetch<SanityDocument[]>({
    query: postsByLangQuery,
    params: { language },
  });
}

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const posts = await getLatestFivePostsByLocale(locale);
  return (
    <main className="relative">
      <Hero />
      <Photos />
      <Articles articles={posts} locale={locale} />
    </main>
  );
}
