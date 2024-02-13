import { PortableText, PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { Button } from "@/components/ui/button";

export function CustomPortableTextHeadings({
  value
}: {
  value: PortableTextBlock[];
}) {
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };
  const headings: PortableTextComponents = {
    block: {
      h1: ({ children }) => {
        return (
          <Button
            className="my-2 h-auto text-wrap text-left text-sm font-bold"
            variant={"link"}
            size={"lg"}
            onClick={() => handleClick(children as string)}
          >
            {children}
          </Button>
        );
      },
      h2: ({ children }) => {
        return (
          <Button
            className="my-2 h-auto text-wrap text-left text-sm font-bold"
            variant={"link"}
            size={"lg"}
            onClick={() => handleClick(children as string)}
          >
            {children}
          </Button>
        );
      },
      h3: ({ children }) => {
        return (
          <Button
            className="my-2 h-auto text-wrap text-left text-sm font-bold"
            variant={"link"}
            size={"lg"}
            onClick={() => handleClick(children as string)}
          >
            {children}
          </Button>
        );
      },
      h4: ({ children }) => {
        return (
          <Button
            className="my-2 h-auto text-wrap text-left text-sm font-bold"
            variant={"link"}
            size={"lg"}
            onClick={() => handleClick(children as string)}
          >
            {children}
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
