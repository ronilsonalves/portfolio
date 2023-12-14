"use client";

import Image from "next/image";

import "@/styles/globals.css";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "@/components/shared/icons";
import ErrorSvg from "@/media/images/svg/error.svg";

export const metadata = {
  title: `An error occurred | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  description: "An error occurred while trying to load this page.",
};

interface ErrorProps {
  message: string;
  description: string;
  button: string;
}

export default function Error() {
  const t = GetTranslatedErrorMsg();
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center text-center">
        <Image
          src={ErrorSvg}
          width={480}
          height={480}
          alt="urban line desert landscape with tumbleweed and cactuses illustration by icons8"
          className="w-48 mb-8"
          loading="lazy"
        />
        <h1 className="mb-5 text-5xl font-bold">500 – {t.message}</h1>
        <p className="mb-5">{t.description}</p>
        <a href="/">
          <Button
            variant={"outline"}
            size={"lg"}
            className="hover:animate-pulse"
          >
            {t.button} <HomeIcon />
          </Button>
        </a>
      </div>
    </div>
  );
}

function GetTranslatedErrorMsg(): ErrorProps {
  const t = useTranslations("Errors.500");
  return {
    message: t("title"),
    description: t("description"),
    button: t("button"),
  };
}
