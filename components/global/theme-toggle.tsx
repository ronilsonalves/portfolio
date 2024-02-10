"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "../ui/button";
import { MoonIcon, SunIcon } from "../shared/icons";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant={"default"}
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    className="flex flex-row justify-center rounded-3xl shadow-lg w-12 h-12"
    >
      <SunIcon className="h-[1.5rem] w-[1.3rem] dark:hidden" />
      <MoonIcon className="hidden h-[1.5rem] w-[1.3rem] dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
