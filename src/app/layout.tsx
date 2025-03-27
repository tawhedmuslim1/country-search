import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Inter } from "next/font/google";
import InfoComponent from "@/components/info-component";

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
      <body className={cn(font.className, "antialiased relative")}>
        <div className="absolute top-0 left-0 w-full h-[50%]">
          <div className="flex items-center justify-center h-full">
            <InfoComponent />
          </div>
        </div>

        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  );
}
