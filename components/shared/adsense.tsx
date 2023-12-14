import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any;
  }
}
interface AdsenseProps {
  adsenseClient: string;
  adsenseSlot: string;
  adsenseFormat?: string;
  adsenseLayout?: string;
  widthResponsive?: boolean;
}

export default function Adsense({
  adsenseClient,
  adsenseSlot,
  adsenseLayout,
  adsenseFormat,
}: AdsenseProps) {
  
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);
  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={adsenseClient}
      data-ad-slot={adsenseSlot}
      data-ad-layout={adsenseLayout}
      data-ad-format={adsenseFormat}
      data-full-width-responsive="true"
    ></ins>
  );
}
