import { SanityDocument } from "@sanity/client";
import { PortableText } from "@portabletext/react";
import { RichTextComponents } from "@/components/blog/post/rich-text";

interface BodyProps {
  body: SanityDocument;
}

export default function Body({ body }: BodyProps) {
  return (
    <div className="prose prose-xl md:prose-2xl col-span-12 my-4 mb-8 justify-center text-black md:col-span-9 dark:text-white">
      <PortableText value={body} components={RichTextComponents} />
    </div>
  );
}
