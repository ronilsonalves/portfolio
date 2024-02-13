"use client";

import { useEffect } from "react";
// @ts-ignore - Cal is not typed
import Cal, { getCalApi } from "@calcom/embed-react";

export default function CalWidget() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      // @ts-ignore - Cal is not typed
      cal.ns["30min"]("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);
  return (
    <Cal
      namespace="30min"
      calLink="ronilsonalves/30min"
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view" }}
    />
  );
}
