import { lazy } from "react";
import { SanityDocument } from "@sanity/client";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ServiceCarouselItem from "./carousel";
const CalWidget = lazy(() => import("../institutional/services/cal-widget"));
import { ContactForm } from "../institutional/about/form";

interface ServiceListingProps {
  services: SanityDocument[];
  locale?: string;
}

export default function ServiceListing({
  services,
  locale,
}: ServiceListingProps) {
  const t = useTranslations("Services");
  return (
    <div className="mt-8 flex flex-col justify-center gap-4 px-4 md:mx-8 md:px-16">
      {/*Services listing card */}
      <Card className="">
        <CardContent>
          <Carousel
            className=""
            opts={{
              align: "center",
            }}
          >
            <CarouselContent className="">
              {services &&
                services.map((service) => {
                  return (
                    <ServiceCarouselItem key={service._id} service={service} />
                  );
                })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </CardContent>
      </Card>
      {/*Contact & meeting schedule card */}
      <div className="w-full">
        <ContactForm />
      </div>
      <div className="flex flex-row place-items-center text-center">
        <div className="w-1/3 border-2" />
        <span className="w-1/3 text-sm font-semibold">{t("OrText")}</span>
        <div className="w-1/3 border-2" />
      </div>
      <div className="w-full">
        <h2 className="mb-4 text-3xl font-semibold">{t("Schedule")}</h2>
        <p className="text-md mb-4 md:text-xl">{t("Description")}</p>
        <div className="">
          <CalWidget />
        </div>
      </div>
    </div>
  );
}
