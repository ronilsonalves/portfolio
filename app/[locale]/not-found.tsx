import Image from "next/image";

import "@/styles/globals.css";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "@/components/shared/icons";
import NotFoundSvg from "@/media/images/svg/not-found.svg";

export const metadata = {
  title: `Page not found – ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  description: "Sorry, we couldn't find the page you were looking for.",
};

interface NotFoundProps {
  message: string;
  description: string;
  button: string;
}

export default function NotFound() {
  const t = GetTranslatedErrorMsg();
  return (
    <div className="w-full min-h-[55vh] lg:min-h-[65vh] flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center text-center">
          <Image src={NotFoundSvg} width={480} height={480} alt="urban line desert landscape with tumbleweed and cactuses illustration by icons8" className="w-48 mb-8" loading="lazy"/>
          <h1 className="mb-5 text-5xl font-bold">404 – {t.message}</h1>
          <p className="mb-5">
            {t.description}
          </p>
          <a href="/" >
            <Button variant={'outline'} size={'lg'} className="hover:animate-pulse"> {t.button}  <HomeIcon/></Button>
          </a>
        </div>
    </div>
  );
}

function GetTranslatedErrorMsg(): NotFoundProps {
  const t = useTranslations("Errors.404");
  return {
    message: t("title"),
    description: t("description"),
    button: t("button"),
  };
}