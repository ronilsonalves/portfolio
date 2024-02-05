import { CustomPortableText } from "@/components/shared/custom-portable-text";
import { ChevronLeftIcon } from "@/components/shared/icons";
import ImageBox from "@/components/shared/image-box";
import ScrollToTopButton from "@/components/shared/scroll-up";
import { Button } from "@/components/ui/button";
import { SanityDocument } from "@sanity/client";
import { useTranslations } from "next-intl";
import type { EncodeDataAttributeCallback } from "@sanity/react-loader";
import Link from "next/link";
import ProjectHeader from "./header";

export default function Project({
  locale,
  project,
  encodedDataAttribute,
}: {
  locale: string;
  project: SanityDocument;
  encodedDataAttribute?: EncodeDataAttributeCallback;
}) {
  const t = useTranslations("Projects");
  const projectsURL = locale === "en" ? "/projects" : `/projetos`;
  const startYear = new Date(project?.duration?.start!).getFullYear();
  const endYear = project?.duration?.end
    ? new Date(project?.duration?.end!).getFullYear()
    : `${t("Present")}`;
  return (
    <div className="mt-8 flex flex-grow px-4 md:px-16 lg:px-32">
      <div className="mb-20 space-y-6">
        <ProjectHeader title={project.title} overview={project.overview} />
        <div className="rounded-lg border">
          <ImageBox
            data-sanity={encodedDataAttribute?.("coverImage")}
            image={project.coverImage}
            alt={project.title}
            classesWrapper="relative aspect-[16/9]"
          />

          {/* Project Metadata */}
          <div className="grid grid-cols-1 divide-y divide-inherit lg:grid-cols-5 lg:divide-x lg:divide-y-0">
            {/* Project Duration */}
            {!!(startYear && endYear) && (
              <div className="p-3 lg:p-4">
                <div className="text-xs md:text-sm">{t("Duration")}</div>
                <div className="text-md md:text-lg">
                  <span data-sanity={encodedDataAttribute?.("duration.start")}>
                    {startYear}
                  </span>
                  {" - "}
                  <span data-sanity={encodedDataAttribute?.("duration.end")}>
                    {endYear}
                  </span>
                </div>
              </div>
            )}
            {/* Project Client */}
            {project.client && (
              <div className="p-3 lg:p-4">
                <div className="text-xs md:text-sm">{t("Client")}</div>
                <div className="text-md md:text-lg">{project.client}</div>
              </div>
            )}
            {/* Project Site */}
            {project.site && (
              <div className="p-3 lg:p-4">
                <div className="text-xs md:text-sm">Site</div>
                {project.site && (
                  <Link
                    target="_blank"
                    className="text-md break-words md:text-lg"
                    href={project.site}
                  >
                    {project.site}
                  </Link>
                )}
              </div>
            )}
            {/* Project Tags */}
            {project.tags && (
              <div className="lg:p04 p-3">
                <div className="text-xs md:text-sm">Tags</div>
                <div className="text-md flex flex-row flex-wrap md:text-lg">
                  {project.tags?.map((tag: any, key: number) => (
                    <div key={key} className="mr-1 break-words">
                      #{tag}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Project Description */}
        {project.description && (
          <CustomPortableText
            paragraphClasses="font-serif max-w-3xl text-xl"
            value={project.description}
          />
        )}

        <Button
          className="w-full items-center justify-center"
          variant="ghost"
          size="lg"
          type="button"
        >
          <Link
            href={projectsURL}
            className="flex flex-row place-items-center hover:animate-pulse"
          >
            <ChevronLeftIcon /> <span>{t("BackTo")}</span>
          </Link>
        </Button>
        <ScrollToTopButton />
      </div>
    </div>
  );
}
