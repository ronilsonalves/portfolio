export function formatDate(date: Date, locale?: string): string {
  // TODO: use locale to format date based on user's locale.
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
