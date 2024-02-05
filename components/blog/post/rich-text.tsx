import Image from "next/image";
import hljs from "highlight.js";
import { lazy } from "react";
import "highlight.js/styles/atom-one-dark.css";
import bash from "highlight.js/lib/languages/bash";
import golang from "highlight.js/lib/languages/go";
import java from "highlight.js/lib/languages/java";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import sql from "highlight.js/lib/languages/sql";
import typescript from "highlight.js/lib/languages/typescript";
import yaml from "highlight.js/lib/languages/yaml";

import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
const AdSenseComponent = lazy(() =>
  import("@/components/shared/adsense").then((mod) => ({
    default: mod.AdSenseComponent,
  })),
);

const builder = imageUrlBuilder(client);

hljs.registerLanguage("bash", bash);
hljs.registerAliases("shell", { languageName: "bash" });
hljs.registerAliases("sh", { languageName: "bash" });
hljs.registerAliases("zsh", { languageName: "bash" });
hljs.registerAliases("undefined", { languageName: "bash" });
hljs.registerLanguage("go", golang);
hljs.registerLanguage("java", java);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("yaml", yaml);

export const RichTextComponents = {
  types: {
    code: ({ value }: any) => {
      return (
        <pre className="prose mx-8 mb-0 mt-0 whitespace-break-spaces shadow-2xl">
          <code
            className={`language-${value.language} whitespace-break-spaces`}
            aria-hidden={true}
            contentEditable={false}
            dangerouslySetInnerHTML={{
              __html: hljs.highlight(
                value.code,
                { language: value.language },
                true,
              ).value,
            }}
          ></code>
        </pre>
      );
    },
    block: ({ value }: any) => {
      switch (value.style) {
        case "h1":
          return (
            <h1 className="prose md:prose-xl ml-8 text-black dark:text-white">
              {value.children[0].text}
            </h1>
          );
        case "h2":
          return (
            <h2 className="prose md:prose-xl ml-8 text-black dark:text-white">
              {value.children[0].text}
            </h2>
          );
        case "h3":
          return (
            <h3 className="prose md:prose-xl ml-8 text-black dark:text-white">
              {value.children[0].text}
            </h3>
          );
        case "h4":
          return (
            <h4 className="prose md:prose-xl ml-8 whitespace-pre-wrap text-black dark:text-white">
              {value.children[0].text}
            </h4>
          );
        case "blockquote":
          return (
            <blockquote className="border-l-4 border-gray-300 pl-4 dark:border-gray-600 ">
              {value.children[0].text}
            </blockquote>
          );
        case "normal":
        default:
          return (
            <p className="prose md:prose-xl ml-8 text-black dark:text-white">
              {value.children &&
                value.children
                  .map((child: any) => {
                    return child.text;
                  })
                  .join(" ")}
            </p>
          );
      }
    },
    image: ({ value }: any) => {
      const asset = value.asset._ref.split("-")[2];
      const imgWidth = asset.split("x")[0];
      const imgHeight = asset.split("x")[1];
      return (
        <figure className="flex flex-col justify-center">
          <Image
            className="prose prose-xl mx-0 mb-0 w-full rounded-xl object-cover md:aspect-[2/1]"
            src={builder.image(value).width(imgWidth).height(imgHeight).url()}
            width={imgWidth}
            height={imgHeight}
            alt={value?.alt}
            loading="lazy"
          />
          <figcaption className="mx-8 mt-1 text-sm text-gray-500 dark:text-gray-400">
            {value?.alt}
          </figcaption>
        </figure>
      );
    },
    ads: ({ value }: any) => {
      return <AdSenseComponent adSlot={value.adsenseSlot} />;
    },
  },
};