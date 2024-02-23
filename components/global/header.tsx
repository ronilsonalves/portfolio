import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "@/components/shared/icons";
import { ThemeToggle } from "@/components/global/theme-toggle";
import { LanguageToggle } from "@/components/global/lang-toggle";

interface NavItem {
  name: string;
  path: string;
}

export function Header() {
  const translatedNavItems = GetTranslatedNavItems();
  return (
    <nav
      className={cn(
        "h-26 sticky top-0 z-10 flex flex-row justify-end space-x-0 bg-white/80 py-4 backdrop-blur md:justify-center dark:bg-black/80",
      )}
    >
      <div
        className={cn("hidden md:flex md:items-center lg:mr-10 lg:space-x-4")}
      >
        {translatedNavItems.map((item) => (
          <Button key={item.name} variant={"link"} className="text-xl">
            <a href={item.path} key={item.path}>
              {item.name}
            </a>
          </Button>
        ))}
      </div>
      <div className="mr-10 flex items-center justify-center space-x-4 md:hidden">
        <MobileNav />
      </div>
      <div className="flex items-center px-4">
        <ThemeToggle />
        <LanguageToggle />
      </div>
    </nav>
  );
}

function MobileNav() {
  const t = useTranslations("Navbar");
  const navItems = GetTranslatedNavItems();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"default"}
          className="flex h-12 flex-row space-x-2 rounded-full shadow-lg"
        >
          <span>Menu</span>
          <ChevronDownIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-h-screen min-w-full border-0 bg-white dark:bg-black/70">
        <DialogHeader>
          <DialogTitle className="p-8 text-center text-2xl">
            {t("Mobile.title")}
          </DialogTitle>
          <DialogDescription className="flex flex-col text-center">
            {navItems.map((item) => (
              <Button key={item.name} variant={"link"} className="my-3">
                <a href={item.path} key={item.path}>
                  {item.name}
                </a>
              </Button>
            ))}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

function GetTranslatedNavItems(): NavItem[] {
  const navItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Articles",
      path: "/articles",
    },
    {
      name: "Projects",
      path: "/projects",
    },
    {
      name: "Services",
      path: "/services",
    },
  ];
  const t = useTranslations("Navbar");
  return navItems.map((item) => ({
    ...item,
    name: t(`${item.name}.title`),
    path: t(`${item.name}.path`),
  }));
}
