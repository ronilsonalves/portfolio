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
import ServiceCarouselItem from "@/components/services/carousel";
const CalWidget = lazy(() => import("@/components/services/cal-widget"));
import { ContactForm } from "@/components/services/form";

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
      <Card className="mx-auto w-full md:max-w-3xl xl:max-w-6xl">
        <CardContent>
          <Carousel
            className=""
            opts={{
              align: "center",
            }}
          >
            <CarouselContent className="mx-auto p-2">
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
      <div className="my-8 flex flex-col justify-center gap-4 px-4 md:mx-8 md:px-16">
        <ContactForm />
      </div>
      <div className="mx-auto flex flex-row place-items-center justify-center gap-2 text-center">
        <div className="min-w-44 border-2" />
        <span className="w-1/3 text-sm font-semibold">{t("OrText")}</span>
        <div className="min-w-44 border-2" />
      </div>
      <div className="mt-8 flex flex-col justify-center gap-4 px-4 md:mx-8 md:px-16">
        <div className="mx-auto w-full md:max-w-3xl xl:max-w-6xl">
          <h2 className="mb-4 text-3xl font-semibold ">{t("Schedule")}</h2>
          <p className="text-md mb-4 md:text-xl">{t("Description")}</p>
        </div>
        <div className="mx-auto mb-8 w-full md:max-w-3xl xl:max-w-6xl">
          <CalWidget />
        </div>
      </div>
    </div>
  );
}
