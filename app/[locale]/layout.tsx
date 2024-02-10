import { notFound } from "next/navigation";
import { lazy } from "react";
import "@/styles/globals.css";
import { unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { fontSans } from "@/lib/fonts";
import { Footer } from "@/components/global/footer";
import { Header } from "@/components/global/header";
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

import { cn } from "@/lib/utils";

const locales = ["en", "pt"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  let messages;
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID!;
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();

  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  unstable_setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning={true}>
    <TagManager gtmId={GTM_ID}/>
    <head/>
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
    <TagManagerNoScript gtmId={GTM_ID}/>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Header/>
      <NextIntlClientProvider messages={messages}>
        {children}
        <SpeedInsights />
      </NextIntlClientProvider>
      <Footer/>
    </ThemeProvider>
    </body>
    </html>
  );
}
