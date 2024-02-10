import { PortableText } from "@portabletext/react";

export default function ProjectHeader({
  title,
  overview,
}: {
  title: string;
  overview: any[];
}) {
  return (
    <div className="w-5/6 lg:w-3/5">
      <h1 className="mb-4 text-3xl font-extrabold tracking-tight md:text-5xl">
        {title}
      </h1>
      <span className="mb-4 font-serif text-xl md:text-2xl">
        {<PortableText value={overview} />}
      </span>
    </div>
  );
}
