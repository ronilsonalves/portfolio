import Image from "next/image";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/formatDate";
import { Badge } from "@/components/ui/badge";

const builder = imageUrlBuilder(client);

export default function PostHeader({
  author,
  categories,
  className,
  locale,
  publishedAt,
  title,
}: {
  author: any;
  categories: string[];
  className?: string;
  locale: string;
  publishedAt: string;
  title: string;
}) {
  return (
    <header className={cn("mx-4 mb-12 flex flex-col", className)}>
      <h1 className="whitespace-break-spaces text-3xl font-extrabold md:text-5xl">
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
      <div className="mt-4 flex items-center gap-1">
        {categories?.map((category) => (
          <Badge key={category} title={category}>
            {category}
          </Badge>
        ))}
      </div>
      <span className="order-last flex items-center text-base text-black dark:text-white">
        {author ? (
          <span className="mt-4 flex items-center gap-1">
            <Image
              className="mb-0 mt-1 rounded-full"
              src={builder.image(author.image).width(48).height(48).url()}
              width={48}
              height={48}
              alt={author.name}
            />
            <span className="ml-2">{author.name}</span>
            <span className="ml-2 text-xs ">●</span>
            <span className="ml-2">
              {author.bio[0]._key === locale
                ? author.bio[0].value
                : author.bio[1].value}
            </span>
          </span>
        ) : null}
      </span>
    </header>
  );
}
