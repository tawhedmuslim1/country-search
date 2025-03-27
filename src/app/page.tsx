"use client";

import { Suspense } from "react";
import { SearchComponent } from "@/components/search-component";

export default function Home() {
  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center grainy">
      <Suspense fallback={<div>Loading search...</div>}>
        <SearchComponent />
      </Suspense>
    </main>
  );
}
