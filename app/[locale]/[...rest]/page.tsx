import {notFound} from 'next/navigation';

export const metadata = {
  title: `Page not found – ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  description: "Sorry, we couldn't find the page you were looking for.",
};

export default function CatchAllPage() {
  notFound();
}