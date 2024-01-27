import { lazy } from "react";
import "@/styles/globals.css";
import { fontSans } from "@/lib/fonts";
import { ThemeProvider } from "@/components/global/theme-provider";

const TagManager = lazy(() =>
  import("@/components/global/tag-manager").then((module) => ({
    default: module.TagManager,
  }))
);
const TagManagerNoScript = lazy(() =>
  import("@/components/global/tag-manager").then((module) => ({
    default: module.TagManagerNoScript,
  }))
);
const AMPAutoAdsScript = lazy(() =>
  import("@/components/shared/adsense").then((module) => ({
    default: module.AMPAutoAdsScript,
  }))
);
const AMPCustomElement = lazy(() =>
  import("@/components/shared/adsense").then((module) => ({
    default: module.AMPCustomElement,
  }))
);

import { cn } from "@/lib/utils";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID!;

  return (
    <html suppressHydrationWarning={true}>
      <TagManager gtmId={GTM_ID} />
      <AMPCustomElement />
      <head />
      <body
        className={cn(
          "antialiased",
          "bg-white",
          "dark:bg-black",
          "text-black",
          "dark:text-white",
          "font-sans",
          "dark:font-sans",
          "transition-colors",
          "duration-1000",
          "ease-in-out",
          "font-sans",
          fontSans.variable
        )}
      >
        <TagManagerNoScript gtmId={GTM_ID} />
        <AMPAutoAdsScript />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
