"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { parseAsString, useQueryState } from "nuqs";
export default function Home() {
  const [input, setInput] = useQueryState<string>("q", parseAsString);
  const [searchResults, setSearchResults] = useState<{
    results: string[];
    duration: number;
  }>();

  useEffect(() => {
    const fetchData = async () => {
      if (!input) return setSearchResults(undefined);

      const res = await fetch(
        `https://fastsearch.ezzeldin.workers.dev/api/search?q=${input}`
      );
      const data = (await res.json()) as {
        results: string[];
        duration: number;
      };
      setSearchResults(data);
    };
    fetchData();
  }, [input]);

  const handleSelect = (value: string) => {
    setInput(value);
    console.log(value);
    // setSearchResults(undefined);

    // TODO: Add extra logic here
  };

  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center grainy">
      <div className="flex flex-col gap-8 items-center pt-32 duration-500 animate-in animate fade-in-5 slide-in-from-bottom-[10.5%]">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-5xl tracking-tight font-bold">
            🔥 Ultra Fast Search 🔥
          </h1>
          <p className="text-md text-muted-foreground max-w-prose text-center">
            A high-performance API built with Hono, Next.js and Cloudflare
            <br />
            Type a country name and get the results in milliseconds
          </p>
        </div>

        <div className="max-w-md w-full">
          <Command>
            <CommandInput
              value={input ?? ""}
              onValueChange={handleSelect}
              placeholder="Search countries..."
              className="placeholder:text-zinc-500"
            />
            <CommandList>
              {searchResults?.results.length === 0 ? (
                <CommandEmpty>No results found.</CommandEmpty>
              ) : null}

              {searchResults?.results ? (
                <CommandGroup heading="Results">
                  {searchResults?.results.map((result) => (
                    <CommandItem
                      key={result}
                      value={result}
                      onSelect={handleSelect}
                    >
                      {result}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}

              {searchResults?.results ? (
                <>
                  <div className="h-px w-full bg-zinc-200" />

                  <p className="p-2 text-xs text-zinc-500">
                    Found {searchResults.results.length} results in{" "}
                    {searchResults?.duration.toFixed(0)}ms
                  </p>
                </>
              ) : null}
            </CommandList>
          </Command>
        </div>
      </div>
    </main>
  );
}
