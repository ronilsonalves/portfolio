import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CustomPortableTextHeadings } from "@/components/blog/post/headings";
import { useTranslations } from "next-intl";

interface TableOfContentsProps {
  slug: string;
  body: string;
  locale: string;
}

export default function TableOfContents({
  slug,
  body,
  locale,
}: TableOfContentsProps) {
  const t = useTranslations("Articles");
  return (
    <div className="top-24 order-first col-span-12 mx-0 px-4 md:sticky md:order-last md:max-h-96 lg:col-span-3">
      <Accordion
        type="single"
        collapsible
        className="top-20 flex-col gap-2 md:sticky"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            {t("TableOfContents")}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col flex-wrap place-items-start">
            <CustomPortableTextHeadings
              value={body as any}
              slug={locale === "en" ? `articles/${slug}` : `artigos/${slug}`}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
