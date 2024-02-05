import Image from "next/image";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { formatDate } from "@/lib/formatDate";
import Cover from "@/components/blog/post/cover";
import { Badge } from "@/components/ui/badge";

const builder = imageUrlBuilder(client);

interface PostHeaderProps {
  author: any;
  categories: string[];
  coverImage: any;
  locale: string;
  publishedAt: string;
  title: string;
}

export default function PostHeader({
  author,
  categories,
  coverImage,
  locale,
  publishedAt,
  title,
}: PostHeaderProps) {
  return (
    <header className="mx-8 mb-12 flex w-full flex-col">
      <h1 className="whitespace-normal text-3xl font-extrabold md:text-4xl dark:text-white">
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
      <span className="flex items-center text-base text-black dark:text-white">
        {author ? (
          <span className="mt-4 flex items-center gap-1">
            <Image
              className="mb-0 mt-1 rounded-full"
              src={builder.image(author.image).width(64).height(64).url()}
              width={64}
              height={64}
              alt={author.name}
              loading="eager"
            />
            <span className="ml-2 font-semibold">{author.name}</span>
            <span className="ml-2 text-xs">●</span>
            <span className="ml-2">
              {author.bio[0]._key === locale
                ? author.bio[0].value
                : author.bio[1].value}
            </span>
          </span>
        ) : null}
      </span>
      <Cover image={coverImage} />
    </header>
  );
}
