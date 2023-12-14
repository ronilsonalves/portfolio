import { getRequestConfig } from "next-intl/server";
 
export default getRequestConfig(async ({locale}) => ({
  messages: (await import(`../messages/${locale}.json`)).default,
  timeZone: locale === "en" ? "America/New_York" : "America/Sao_Paulo",
  now: new Date()
}));