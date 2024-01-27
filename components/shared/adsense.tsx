"use client";

import React, { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: any | any[];
  }
}

interface AdSenseComponentProps {
  adSlot?: string;
}

const config = {
  client: process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID,
  defaultSlot: process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_ID,
};

export const AdSenseComponent = (adSlot?: AdSenseComponentProps) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("Error loading AdSense Ad: ", err);
    }
  }, []);

  return (
    <div className="shadow-sm rounded-sm">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={config.client}
        data-ad-slot={adSlot?.adSlot || config.defaultSlot}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export const AMPCustomElement = () => {
  return (
    <script
      async
      src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"
    ></script>
  );
};

export const AMPAutoAdsScript = () => {
  return (
    // @ts-ignore - amp-auto-ads is not a valid element
    <amp-auto-ads type="adsense" data-ad-client={config.client}>
      {/* @ts-ignore */}
    </amp-auto-ads>
  );
};
