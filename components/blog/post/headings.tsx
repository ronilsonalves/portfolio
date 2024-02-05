import { PortableText, PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CustomPortableTextHeadings({
  value,
  slug,
}: {
  value: PortableTextBlock[];
  slug: string;
}) {
  const headings: PortableTextComponents = {
    block: {
      h1: ({ children }) => {
        return (
          <Button
            className="my-2 h-auto text-wrap text-left text-sm font-bold"
            variant={"link"}
            size={"lg"}
          >
            <Link href={`/${slug}#${children}`}>{children}</Link>
          </Button>
        );
      },
      h2: ({ children }) => {
        return (
          <Button
            className="my-2 h-auto text-wrap text-left text-sm font-bold"
            variant={"link"}
            size={"lg"}
          >
            <Link href={`/${slug}#${children}`}>{children}</Link>
          </Button>
        );
      },
      h3: ({ children }) => {
        return (
          <Button
            className="my-2 h-auto text-wrap text-left text-sm font-bold"
            variant={"link"}
            size={"lg"}
          >
            <Link href={`/${slug}#${children}`}>{children}</Link>
          </Button>
        );
      },
      h4: ({ children }) => {
        return (
          <Button
            className="my-2 h-auto text-wrap text-left text-sm font-bold"
            variant={"link"}
            size={"lg"}
          >
            <Link href={`/${slug}#${children}`}>{children}</Link>
          </Button>
        );
      },
      normal: ({}) => <p className="sr-only"></p>,
      p: ({}) => <p className="sr-only"></p>,
      ul: ({}) => <p className="sr-only"></p>,
      ol: ({}) => <p className="sr-only"></p>,
      pre: ({}) => <p className="sr-only"></p>,
    },
    list: {
      bullet: ({}) => <p className="sr-only"></p>,
    },
    listItem: {
      bullet: ({}) => <p className="sr-only"></p>,
    },
    marks: {
      link: ({}) => <p className="sr-only"></p>,
    },
    types: {
      image: ({}) => <p className="sr-only"></p>,
      code: ({}) => <p className="sr-only"></p>,
    },
  };

  return <PortableText components={headings} value={value} />;
}
