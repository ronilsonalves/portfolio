import { SanityDocument } from "@sanity/client";
import { projectQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { toPlainText } from "@portabletext/react";
import Project from "./components/project";
import { urlForOpenGraphImage } from "@/sanity/lib/image";

async function getProjectBySlug(slug: string) {
  return await sanityFetch<SanityDocument>({
    query: projectQuery,
    params: { slug },
  });
}

export async function generateMetadata({
  params: { slug, locale },
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const project = await getProjectBySlug(slug);
  const projectTitleText = locale === "en" ? "Projects" : "Projetos";

  if (!project) {
    return {
      title: `Project not found – ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      description: "Sorry, we couldn't find the project you were looking for.",
      openGraph: {
        title: `Project not found – ${process.env.NEXT_PUBLIC_SITE_NAME}`,
        description:
          "Sorry, we couldn't find the project you were looking for.",
      },
    };
  }

  const languages = project?._translations?.filter(
    (translation: any) => translation != undefined,
  );

  const en = languages?.filter((language: any) => language?.language === "en");
  const pt = languages?.filter((language: any) => language?.language === "pt");

  return {
    metadataBase: new URL(
      process.env.PUBLIC_SITE_URL || "https://www.ronilsonalves.com",
    ),
    alternates: {
      canonical: locale === "en" ? `/projects/${slug}` : `/projetos/${slug}`,
      languages: {
        en: en?.length > 0 ? "/projects/" + en[0].slug.current : null,
        pt: pt?.length > 0 ? "/projetos/" + pt[0].slug.current : null,
      },
    },
    title:
      project.title +
      " – " +
      projectTitleText +
      " – " +
      process.env.NEXT_PUBLIC_SITE_NAME,
    description: toPlainText(project.overview),
    keywords: project.tags.join(", "),
    openGraph: {
      type: "website",
      locale: locale,
      alternateLocale: en?.length > 0 ? "en" : "pt",
      url:
        locale === "en"
          ? `/projects/${slug}`
          : `/projetos/${pt[0]?.slug.current}`,
      title: project.title + " – " + process.env.NEXT_PUBLIC_SITE_NAME,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      description: toPlainText(project.overview),
      images: [
        {
          url: urlForOpenGraphImage(project.coverImage)!,
          width: 1200,
          height: 627,
          alt: project.coverImage.alt || project.title,
        },
      ],
    },
  };
}

export default async function ProjectPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const project = await getProjectBySlug(slug);

  if (!project) {
    return notFound();
  }

  return <Project project={project} locale={locale} />;
}
