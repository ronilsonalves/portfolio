import Link from "next/link";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

import {
  GitHubIcon,
  LinkedInIcon,
  TikTokIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/shared/social-icons";

interface SocialLinkProps {
  className?: string;
  href: string;
  children: React.ReactNode;
  Icon: React.FC<{ className?: string }>;
}

function SocialLink({ className, href, children, Icon }: SocialLinkProps) {
  return (
    <li className={cn(className, "flex")}>
      <Link
        href={href}
        className="group flex text-sm font-medium "
      >
        <Icon className="h-6 w-6 flex-none"/>
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  );
}

export default function Socials() {
  const t = useTranslations("Socials");
  return (
    <ul
      role="list"
      className="my-4 border-t border-b border-zinc-100 py-4 dark:border-zinc-700/40"
    >
      <SocialLink className="mt-4" href={t("Github.Href")} Icon={GitHubIcon}>
        {t("Github.Title")}
      </SocialLink>
      <SocialLink href={t("LinkedIn.Href")} className="mt-4" Icon={LinkedInIcon}>
        {t("LinkedIn.Title")}
      </SocialLink>
      <SocialLink href={t("TikTok.Href")} className="mt-4" Icon={TikTokIcon}>
        {t("TikTok.Title")}
      </SocialLink>
      <SocialLink href={t("Twitter.Href")} className="mt-4" Icon={XIcon}>
        {t("Twitter.Title")}
      </SocialLink>
      <SocialLink href={t("YouTube.Href")} className="mt-4" Icon={YouTubeIcon}>
        {t("YouTube.Title")}
      </SocialLink>
    </ul>
  );
}
