import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import {
  useInstantSearch,
  useSearchBox,
  UseSearchBoxProps,
} from "react-instantsearch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "@/components/shared/icons";

// Dynamically import the PoweredBy component to avoid SSR issues
const PoweredBy = dynamic(
  () => import("react-instantsearch").then((mod) => mod.PoweredBy),
  {
    ssr: false,
  },
) as React.FC<any>;

export function SearchBox(props: UseSearchBoxProps) {
  const { theme } = useTheme();
  const { query, refine } = useSearchBox(props);
  const { status } = useInstantSearch();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  const isSearchStalled = status === "stalled";

  function setQuery(newQuery: string) {
    setInputValue(newQuery);
    refine(newQuery);
  }

  return (
    <div>
      <form
        action=""
        className="relative w-full"
        role="search"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          inputRef.current?.blur();
        }}
        onReset={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setQuery("");
          inputRef.current?.focus();
        }}
      >
        <Input
          ref={inputRef}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder={isSearchStalled ? "Loading..." : "Search"}
          spellCheck="false"
          maxLength={512}
          type="search"
          value={inputValue}
          onChange={(e) => setQuery(e.currentTarget.value)}
          autoFocus
          aria-label="Search for articles"
          className="text-md w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
        />
        <Button
          type={"submit"}
          variant={"default"}
          size={"icon"}
          hidden={inputValue.length === 0 || isSearchStalled}
          className="absolute bottom-0 right-0 top-0 m-auto"
        >
          <SearchIcon className="w-4" />
        </Button>
        <Button
          onClick={() => {
            setQuery("");
            inputRef.current?.focus();
          }}
          size={"icon"}
          type="reset"
          className={`absolute bottom-0 right-0 top-0 m-auto px-2 ${
            inputValue ? "block" : "hidden"
          }`}
        >
          X
        </Button>
      </form>
      <div className="mt-2 flex w-full flex-col place-items-end">
        {/* @ts-ignore - due to Algolia theme type */}
        <PoweredBy theme={theme} className="w-32" />
      </div>
    </div>
  );
}
