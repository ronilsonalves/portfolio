import { Button } from "@/components/ui/button";
import {
  GitHubIcon,
  LinkedInIcon,
  TikTokIcon,
  XIcon,
  YouTubeIcon,
} from "../shared/social-icons";
import { useTranslations } from "next-intl";

// TODO: Move NavItem to a shared file
interface NavItem {
  name: string;
  path: string;
}

export function Footer() {
  const icons = useTranslations("Socials");
  const t = useTranslations("Footer");
  const navItems = GetTranslatedFooterNavItems();
  return (
    <footer className="mx-8 flex flex-col gap-1 space-y-4 border-t py-2 md:py-4">
      <div className="flex flex-col items-stretch justify-center gap-1 sm:flex-row md:items-center md:justify-around">
        <div className="flex flex-col text-left md:items-start">
          <h4 className="text-xl">
            <a href="/" rel="noopener" title={t("Name.title")}>
              <Button
                size={"default"}
                variant={"link"}
                title={t("Name.title")}
                className="px-0 text-xl"
              >
                {t("Name.title")}
              </Button>
            </a>
          </h4>
          <p className="my-2 text-left text-sm">{t("Description.title")}</p>
          <div className="justify-left flex h-12 space-x-2">
            <a
              href={icons("Github.Href")}
              target="_blank"
              rel="noopener"
              title={icons("Github.Title")}
            >
              <Button
                size={"icon"}
                variant={"link"}
                title={icons("Github.Title")}
              >
                <GitHubIcon className="w-8" />
              </Button>
            </a>
            <a
              href={icons("LinkedIn.Href")}
              target="_blank"
              rel="noopener"
              title={icons("LinkedIn.Title")}
            >
              <Button
                size={"icon"}
                variant={"link"}
                title={icons("LinkedIn.Title")}
              >
                <LinkedInIcon className="w-8" />
              </Button>
            </a>
            <a
              href={icons("TikTok.Href")}
              target="_blank"
              rel="noopener"
              title={icons("TikTok.Title")}
            >
              <Button
                size={"icon"}
                variant={"link"}
                title={icons("TikTok.Title")}
              >
                <TikTokIcon className="w-8" />
              </Button>
            </a>
            <a
              href={icons("Twitter.Href")}
              target="_blank"
              rel="noopener"
              title={icons("Twitter.Title")}
            >
              <Button
                size={"icon"}
                variant={"link"}
                title={icons("Twitter.Title")}
              >
                <XIcon className="w-8" />
              </Button>
            </a>
            <a
              href={icons("YouTube.Href")}
              target="_blank"
              rel="noopener"
              title={icons("YouTube.Title")}
            >
              <Button
                size={"icon"}
                variant={"link"}
                title={icons("YouTube.Title")}
              >
                <YouTubeIcon className="w-8" />
              </Button>
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex flex-col justify-center sm:flex-row sm:space-x-4">
            {navItems.map((item) => (
              <a
                href={item.path}
                key={item.path}
                rel="noopener"
                title={item.name}
              >
                <Button
                  size={"default"}
                  variant={"link"}
                  title={item.name}
                  className="text-md px-0"
                >
                  {item.name}
                </Button>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <span className="text-md">
          © {new Date().getFullYear()} – {t("Name.title")}
        </span>
        <span className="text-md text-inherit">{t("Copyright.text")}</span>
      </div>
    </footer>
  );
}

function GetTranslatedFooterNavItems(): NavItem[] {
  const navItems = [
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
