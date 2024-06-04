// Unused due to error of hidrating the page, the publishedAt from the hit is been hydrated as english date on server and formated to localdate on browser.
// This is causing the page to re-render on hydration and the error is thrown.
"use client";

import { Hit as AlgoliaHit } from "instantsearch.js";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "@/components/shared/icons";
import { formatDate } from "@/lib/formatDate";

type HitProps = {
  hit: AlgoliaHit<{
    title: string;
    slug: string;
    summary: string;
    publishedAt: string;
  }>;
};

export function Hit({ hit }: HitProps) {
  const t = useTranslations("Articles");
  const locale = useLocale();
  return (
    <Link href={localeURL(locale, hit.slug)} key={hit.objectID}>
      <article title={hit.title} className="col-auto gap-4">
        <Card className="dark:border-1 hover:bg-black/5 dark:hover:bg-white/10">
          <CardHeader>
            <div className="relative z-10 order-first mb-3 flex items-center pl-3.5 text-sm text-zinc-400 dark:text-zinc-500">
              <span
                className="absolute inset-y-0 left-0 flex items-center"
                aria-hidden="true"
              >
                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
              </span>
              <p
                className="text-sm text-gray-500 "
                title={formatDate(new Date(hit.publishedAt), locale)}
              >
                {formatDate(new Date(hit.publishedAt), locale)}
              </p>
            </div>
            <CardTitle className="h2 text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
              {hit.title}
            </CardTitle>
            <CardDescription className="text-black/70 dark:text-white/70">
              {hit.summary}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              variant={"ghost"}
              size={"sm"}
              className="text-sm"
              title="Read article"
              type="button"
            >
              {t("Card.Read")}
              <ChevronRightIcon />
            </Button>
          </CardFooter>
        </Card>
      </article>
    </Link>
  );
}

function localeURL(locale: string, slug: string) {
  return locale === "en" || undefined
    ? `/articles/` + slug
    : `/artigos/` + slug;
}
