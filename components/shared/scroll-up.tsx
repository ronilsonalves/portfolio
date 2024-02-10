"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpCircleIcon } from "@/components/shared/icons";

const isBrowser = () => typeof window !== "undefined";

function scrollToTop() {
  if (isBrowser()) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => {
      if (isBrowser()) {
        if (window.scrollY > 300) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };
    if (isBrowser()) {
      window.addEventListener("scroll", toggleVisibility);
    }
    return () => {
      if (isBrowser()) {
        window.removeEventListener("scroll", toggleVisibility);
      }
    };
  }, []);

  return (
    <Button
      className={`${isVisible ? "opacity-100" : "opacity-0"} fixed bottom-8 right-8 z-50 m-4 h-12 w-12 rounded-full bg-gray-800 p-2 text-white shadow-lg transition duration-300 ease-in-out hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900`}
      onClick={scrollToTop}
      variant={"ghost"}
      type="button"
      size={"icon"}
      title="Scroll to top"
    >
      <ArrowUpCircleIcon />
    </Button>
  );
}
