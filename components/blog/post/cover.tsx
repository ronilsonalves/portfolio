import Image from "next/image";
import imageUrlBuider from "@sanity/image-url";
import { client } from "@/sanity/lib/client";

const builder = imageUrlBuider(client);

interface CoverProps {
  image: any;
  title: string;
}

export default function Cover({ image, title }: CoverProps) {
  const asset = image.asset._ref.split("-")[2];
  const width = asset.split("x")[0];
  const height = asset.split("x")[1];
  return (
    <figure className="mt-2 flex flex-col place-items-center">
      <Image
        className="prose prose-2xl mx-0 mb-0 w-full rounded-3xl object-cover shadow-xl md:aspect-[2/1] dark:shadow-zinc-800"
        src={builder.image(image).width(width).height(height).url()}
        width={width}
        height={height}
        alt={image.alt || title}
        priority
      />
      <figcaption className="mx-4 mt-2 text-gray-600 dark:text-gray-100">
        {image.alt || title}
      </figcaption>
    </figure>
  );
}
