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
    <footer className="flex flex-col gap-1 space-y-4 border-t mx-8 py-2 md:py-4">
      <div className="flex flex-col gap-1 justify-center items-stretch sm:flex-row md:justify-around md:items-center">
        <div className="flex flex-col text-left md:items-start">
          <h4 className="text-xl">
            <a href="/" rel="noopener" title={t("Name.title")}>
              <Button
                size={"default"}
                variant={"link"}
                title={t("Name.title")}
                className="text-xl px-0"
              >
                {t("Name.title")}
              </Button>
            </a>
          </h4>
          <p className="text-sm text-left my-2">{t("Description.title")}</p>
          <div className="flex justify-left space-x-2 h-12">
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
          <div className="flex flex-col sm:flex-row justify-center sm:space-x-4">
            {navItems.map((item) => (
              <a href={item.path} key={item.path} rel="noopener" title={item.name}>
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
      <div className="flex flex-col justify-center items-center">
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
      path: "/services"
    },
    {
      name: "Privacy",
      path: "/privacy",
    }
  ];
  const t = useTranslations("Navbar");
  return navItems.map((item) => ({
    ...item,
    name: t(`${item.name}.title`),
    path: t(`${item.name}.path`),
  }));
}
