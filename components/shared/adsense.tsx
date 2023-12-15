"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    adsbygoogle?: any | any[];
  }
}
const config = {
  client: process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID,
};

interface AdsenseProps {
  adsenseClient: string;
  adsenseSlot: string;
  adsenseFormat?: string;
  adsenseLayout?: string;
  widthResponsive?: boolean;
}

export const AdSenseComponent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (process.env.NODE_ENV === "development") {
    return null;
  }
  useEffect(() => {
    const url = `${pathname}?${searchParams.toString()}`;
    console.log("url", url);
    console.log("Adsense -> Router change", url);

    const scriptElement = document.querySelector(`script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.client}"]`)
    //const scriptElement = document.querySelector('#adsenseCa');
    const handleScriptLoad = () => {
      try {
        if (window.adsbygoogle) {
          window.adsbygoogle.push({})
        } else {
        scriptElement?.addEventListener("load", () => {
          handleScriptLoad();
        });
      }
      } catch (err) {
        console.error(err);
      }
    };

    handleScriptLoad();

    return () => {
      if (scriptElement) {
        scriptElement.removeEventListener("load", handleScriptLoad);
      }
    }
  }, [pathname, searchParams]);

  return (
    <>
      <ins
        key={Math.random()}
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-client={config.client}
        data-ad-slot="8285876059"
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-full-width-responsive="true"
      ></ins>
    </>
  )
}

// export default function Adsense({
//   adsenseClient,
//   adsenseSlot,
//   adsenseLayout,
//   adsenseFormat,
// }: AdsenseProps) {
//   useEffect(() => {
//     if (window.adsbygoogle == null) {
//       // const script = document.createElement("script");
//       // script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
//       // script.async = true;
//       // script.defer = true;
//       // document.body.appendChild(script);
//       (window.adsbygoogle = window.adsbygoogle || []).push({});
//     }
//     (window.adsbygoogle = window.adsbygoogle || []).push({});
//   }, []);
//   return (
//     <>
//       <ins
//         key={Math.random()}
//         className="adsbygoogle"
//         style={{ display: "block", textAlign: "center" }}
//         data-ad-client={config.client}
//         data-ad-slot={adsenseSlot}
//         data-ad-layout="in-article"
//         data-ad-format="fluid"
//         data-full-width-responsive="true"
//       ></ins>
//     </>
//   );
// }
