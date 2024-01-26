import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import {client} from "@/sanity/lib/client";

const builder = imageUrlBuilder(client)

export default function MainImg(img: any) {
	const asset = img.img.asset._ref.split("-")[2];
	const imgWidth = asset.split("x")[0];
	const imgHeight = asset.split("x")[1];
	return (
		<figure className="flex flex-col justify-center">
			<Image
				className="prose prose-2xl w-full rounded-3xl shadow-xl dark:shadow-zinc-800 object-cover md:aspect-[2/1] mx-0 mb-0"
				src={builder.image(img.img).width(imgWidth).height(imgHeight).url()}
				width={imgWidth}
				height={imgHeight}
				alt={img?.img?.alt}
			/>
			<figcaption className="text-gray-500 dark:text-gray-400 mx-8">
				{img?.img?.alt}
			</figcaption>
		</figure>
	)
}