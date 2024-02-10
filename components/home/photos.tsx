/**
 * TODO: alternate to CDN to reduce load time
 */
import Image from "next/image";
import img1 from "@/media/images/photos/image-1.jpeg";
import img2 from "@/media/images/photos/image-2.jpg";
import img3 from "@/media/images/photos/image-3.jpg";
import img4 from "@/media/images/photos/image-4.jpeg";
import img5 from "@/media/images/photos/image-5.jpg";
import { cn } from "@/lib/utils";

export default function Photos() {
  let rotations = [
    "rotate-2",
    "-rotate-2",
    "rotate-2",
    "rotate-2",
    "-rotate-2",
  ];

  return (
      <section className="my-6 flex justify-center gap-5 overflow-hidden py-4 sm:gap-12">
        {[img1, img2, img3, img4, img5].map((image, imageIndex) => (
          <div
            key={image.src}
            className={cn(
              "shadow-2xl dark:shadow-white/20 hover:animate-pulse relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl sm:w-72 sm:rounded-2xl",
              rotations[imageIndex % rotations.length]
            )}
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
              priority
            />
          </div>
        ))}
      </section>
  );
}