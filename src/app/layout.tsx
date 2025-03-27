import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Inter } from "next/font/google";

import "./globals.css";

const font = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Country Search",
  description: "Search for a country by name",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(font.className, "antialiased")}>
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  );
}
