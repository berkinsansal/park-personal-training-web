import type { Metadata } from "next";
import { Geist } from "next/font/google";
import LocaleUpdater from "@/components/LocaleUpdater";
import "../globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin | Park Personal Training",
  description: "",
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={geist.variable}>
      <head />
      <body className="bg-zinc-950 text-white antialiased">
        <LocaleUpdater />
        {children}
      </body>
    </html>
  );
}
