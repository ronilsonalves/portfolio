import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const lang = cookies().get("NEXT_LOCALE")?.value || "en" || "pt";
  return (
    <Button
      variant={"link"}
      size={"sm"}
      className="flex h-12 w-12 flex-row justify-center"
    >
      <a href="/en" className={lang === "en" ? "hidden" : "block"}>
        EN
      </a>
      <a className={lang === "pt" ? "hidden" : "block"} href="/pt">
        PT
      </a>
    </Button>
  );
}
