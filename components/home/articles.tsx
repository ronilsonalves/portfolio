import Link from "next/link";
import { useTranslations } from "next-intl";
import type { SanityDocument } from "@sanity/client";
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

interface ArticlesProps {
  articles: SanityDocument[];
  locale?: string;
}

export default function Articles({articles, locale}: ArticlesProps) {
  const t = useTranslations("Home.Articles");
  return (
    <section className="flex flex-col">
      <div className="container py-10 lg:px-40 flex flex-col justify-end">
        <h2 className="mb-5 text-5xl font-bold break-after-column">{t('Title')}</h2>
        <p className="mb-6 text-lg dark:text-white/70 text-black/70">
          {t('Description')}
        </p>
        <div className="grid grid-cols-1 gap-4 ">
          {articles.map((post) => (
            <Link
              href={localeURL(locale!, post.slug.current)}
              key={post.title}
            >
              <Post key={post.title} post={post} locale={locale} />
            </Link>
          ))}
        </div>
        <Link
          href={locale == 'en' ? `/articles` : `/${locale}/artigos`}
          title={t("Button")}
        >
          <Button
            variant={"ghost"}
            size={"lg"}
            className="mt-2 hover:animate-pulse self-end"
          >
            {t('Button') +` >`}
          </Button>
        </Link>
      </div>
    </section>
  );
}

function Post({ post, locale }: { post: SanityDocument, locale?: string }) {
  return (
    <article title={post.title}>
      <Card className="hover:bg-black/5 dark:hover:bg-white/10 dark:border-1">
        <CardHeader>
          <div className="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5">
            <span
              className="absolute inset-y-0 left-0 flex items-center"
              aria-hidden="true"
            >
              <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
            </span>
            <p
              className="text-sm text-gray-500 "
              title={formatDate(new Date(post.publishedAt),locale)}
            >
              {formatDate(new Date(post.publishedAt),locale)}
            </p>
          </div>
          <CardTitle className="h2 text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
            {post.title}
          </CardTitle>
          <CardDescription className="dark:text-white/70 text-black/70">
            {post.summary}
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
            Read article
            <ChevronRightIcon />
          </Button>
        </CardFooter>
      </Card>
    </article>
  );
}

function localeURL(locale: string, slug: string) {
  return locale === 'en' || undefined ? `/articles/`+slug : locale+'/articles/' + slug
}