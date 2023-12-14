import { PortableText, PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { Image } from "sanity";

import ImageBox from "@/components/shared/image-box";
import { TimelineSection } from "@/components/shared/timeline-section";

export function CustomPortableText({
  paragraphClasses,
  value,
}: {
  paragraphClasses?: string;
  value: PortableTextBlock[];
}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return <p className={paragraphClasses}>{children}</p>;
      },
      h1: ({children}) => {
        return <h1 className="text-4xl font-bold">{children}</h1>
      },
      h2: ({children}) => {
        return <h2 className="text-3xl font-bold my-8">{children}</h2>
      },
      h3: ({children}) => {
        return <h3 className="text-2xl font-bold my-6">{children}</h3>
      },
      h4: ({children}) => {
        return <h4 className="text-xl font-bold my-4">{children}</h4>
      },
    },
    list: {
      bullet: ({ children }) => {
        return <ul className="ml-8 list-disc before:zinc-500">{children}</ul>;
      },
    },
    listItem: {
      bullet: ({ children }) => {
        return <li className="text-bold text-xl mb-4 w-[80%]">{children}</li>;
      },
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <a
            className="underline transition hover:opacity-50"
            href={value?.href}
            rel="noreferrer noopener"
          >
            {children}
          </a>
        );
      },
    },
    types: {
      image: ({
        value,
      }: {
        value: Image & { alt?: string; caption?: string };
      }) => {
        return (
          <div className="my-6 space-y-2">
            <ImageBox
              image={value}
              alt={value.alt}
              classesWrapper="relative aspect-[16/9]"
            />
            {value?.caption && (
              <div className="font-sans text-sm text-gray-600 dark:text-zinc-300">
                {value.caption}
              </div>
            )}
          </div>
        );
      },
      timeline: ({ value }) => {
        const { items } = value || {};
        return <TimelineSection timelines={items} />
      },
    },
  };

  return <PortableText components={components} value={value} />;
}
