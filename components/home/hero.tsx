import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import {
  GitHubIcon,
  LinkedInIcon,
  TikTokIcon,
  XIcon,
  YouTubeIcon,
} from "../shared/social-icons";

export default function Hero() {
  const t = useTranslations("Home");
  const ts = useTranslations("Socials");
  return (
    <section className="h-1/2 flex flex-col">
      <div className="container py-10 2xl:px-40">
        <h1 className="sr-only">Ronilson Alves</h1>
        <h2 className="mb-5 text-5xl font-bold break-after-column">
          {t("Hero.Title")} <br /> {t("Hero.Subtitle")}
        </h2>
        <p className="mb-6 text-lg dark:text-white/70 text-black/70">
          {t("Hero.Description")}
        </p>
        <div className="flex justify-left space-x-4">
          <a
            href={ts("Github.Href")}
            target="_blank"
            rel="noopener"
            title={ts("Github.Title")}
          >
            <Button size={"icon"} variant={"link"} title={ts("Github.Title")}>
              <GitHubIcon className="w-12" />
            </Button>
          </a>
          <a
            href={ts("LinkedIn.Href")}
            target="_blank"
            rel="noopener"
            title={ts("LinkedIn.Title")}
          >
            <Button size={"icon"} variant={"link"} title={ts("LinkedIn.Title")}>
              <LinkedInIcon className="w-12" />
            </Button>
          </a>
          <a
            href={ts("TikTok.Href")}
            target="_blank"
            rel="noopener"
            title={ts("TikTok.Title")}
          >
            <Button size={"icon"} variant={"link"} title={ts("TikTok.Title")}>
              <TikTokIcon className="w-12" />
            </Button>
          </a>
          <a
            href={ts("Twitter.Href")}
            target="_blank"
            rel="noopener"
            title={ts("Twitter.Title")}
          >
            <Button size={"icon"} variant={"link"} title={ts("Twitter.Title")}>
              <XIcon className="w-12" />
            </Button>
          </a>
          <a
            href={ts("YouTube.Href")}
            target="_blank"
            rel="noopener"
            title={ts("YouTube.Title")}
          >
            <Button size={"icon"} variant={"link"} title={ts("YouTube.Title")}>
              <YouTubeIcon className="w-12" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
