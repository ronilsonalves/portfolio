import Link from "next/link";
import { SanityDocument } from "next-sanity";
import ProjectCard from "@/components/projects/card";

interface ProjectsListingProps {
  projects: SanityDocument[];
}

export default function ProjectsListing({ projects }: ProjectsListingProps) {
  return (
    <div className="mx-auto my-8 max-w-[100rem] rounded-md border">
      {projects.map((project: SanityDocument, key: number) => (
        <Link key={key} href={`/projects/${project.slug.current}`}>
          <ProjectCard project={project} odd={key % 2} />
        </Link>
      ))}
    </div>
  );
}
