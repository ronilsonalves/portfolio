import Image from "next/image";
import {client} from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/formatDate";
import { Button } from "../ui/button";

const builder = imageUrlBuilder(client);

export default function BlogHeader({
  author,
  categories,
  className,
  locale,
  publishedAt,
  title
}: {
  author: any;
  categories: string[];
  className?: string;
  locale: string;
  publishedAt: string;
  title: string;
}) {
  return (
    <header className={cn("flex flex-col mb-12 mx-4", className)}>
      <h1 className="text-3xl font-extrabold md:text-5xl whitespace-break-spaces">
        {title}
      </h1>
      <time
        dateTime={publishedAt}
        className="order-first flex items-center text-base dark:text-white"
      >
        <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
        <span className="ml-3 text-black dark:text-white ">
          {formatDate(new Date(publishedAt), locale)}
        </span>
      </time>
      {/* TODO: Add action to these buttons to redirect user to posts by these respective categories */}
      <div className="flex items-center gap-1 mt-4">
        {categories?.map((category) => (
          <Button key={category}>{category}</Button>
        ))}
      </div>
      <span className="order-last flex items-center text-base text-black dark:text-white">
        {author ? (
          <span className="flex items-center gap-1 mt-4">
            <Image
              className="rounded-full mt-1 mb-0"
              src={builder.image(author.image).width(48).height(48).url()}
              width={48}
              height={48}
              alt={author.name}
            />
            <span className="ml-2">{author.name}</span>
            <span className="ml-2 text-xs ">●</span>
            <span className="ml-2">{author.bio[0]._key === locale ? author.bio[0].value : author.bio[1].value}</span>
          </span>
        ) : null}
      </span>
    </header>
  );
}
