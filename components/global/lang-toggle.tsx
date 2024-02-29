import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const locale = useLocale();
  return (
    <Button
      variant={"link"}
      size={"sm"}
      className="flex h-12 w-12 flex-row justify-center"
    >
      <a href="/en" className={locale === "en" ? "hidden" : "block"}>
        EN
      </a>
      <a className={locale === "pt" ? "hidden" : "block"} href="/pt">
        PT
      </a>
    </Button>
  );
}
