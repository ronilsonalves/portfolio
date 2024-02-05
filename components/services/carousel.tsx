import { CarouselItem } from "@/components/ui/carousel";
import { SanityDocument } from "@sanity/client";
import { urlForImage } from "@/sanity/lib/image";
import { CustomPortableText } from "../shared/custom-portable-text";
import Image from "next/image";

export interface ServiceCarouselItemProps {
  service: SanityDocument;
}

export default function ServiceCarouselItem({
  service,
}: ServiceCarouselItemProps) {
  return (
    <CarouselItem key={service._id} className="">
      <Image
        alt={service.title}
        src={urlForImage(service.coverImage)?.url()!}
        width={640}
        height={380}
        layout="responsive"
        loading="eager"
      />
      <h2 className="text-2xl font-bold md:text-3xl">{service.title}</h2>
      <CustomPortableText value={service.overview} />
    </CarouselItem>
  );
}
