import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";

const builder = imageUrlBuilder(client);

export default function MainImg(img: any) {
  const asset = img.img.asset._ref.split("-")[2];
  const imgWidth = asset.split("x")[0];
  const imgHeight = asset.split("x")[1];
  return (
    <figure className="flex flex-col justify-center">
      <Image
        className="prose prose-2xl mx-0 mb-0 w-full rounded-3xl object-cover shadow-xl md:aspect-[2/1] dark:shadow-zinc-800"
        src={builder.image(img.img).width(imgWidth).height(imgHeight).url()}
        width={imgWidth}
        height={imgHeight}
        alt={img?.img?.alt}
      />
      <figcaption className="mx-8 text-gray-500 dark:text-gray-400">
        {img?.img?.alt}
      </figcaption>
    </figure>
  );
}
