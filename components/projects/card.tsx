import { SanityDocument } from "next-sanity";
import { CustomPortableText } from "@/components/shared/custom-portable-text";
import ImageBox from "@/components/shared/image-box";

interface ProjectCardProps {
  project: SanityDocument;
  odd?: number;
}

export default function ProjectCard({ project, odd }: ProjectCardProps) {
  return (
    <div
      className={`flex flex-col gap-x-5 p-2 transition hover:bg-gray-50/50 xl:flex-row ${
        odd && "border-b border-t xl:flex-row-reverse"
      }`}
    >
      <div className="w-full xl:w-9/12">
        <ImageBox
          image={project.coverImage}
          alt={`Cover image from ${project.title}`}
          classesWrapper="relative aspect-[16/9]"
        />
      </div>
      <div className="flex xl:w-1/4">
        <TextBox project={project} />
      </div>
    </div>
  );
}

function TextBox({ project }: ProjectCardProps) {
  return (
    <div className="relative my-2 flex w-full flex-col justify-between p-3 xl:mt-0">
      <div>
        <div className="mb-2 text-xl font-extrabold tracking-tight md:text-2xl">
          {project.title}
        </div>
        <div className="font-serif text-gray-500">
          <CustomPortableText value={project.overview} />
        </div>
      </div>
      <div className="mt-4 flex flex-row flex-wrap gap-x-4">
        {project.tags?.map((tag: string, key: number) => (
          <div className="text-sm font-medium lowercase md:text-lg" key={key}>
            #{tag}
          </div>
        ))}
      </div>
    </div>
  );
}
