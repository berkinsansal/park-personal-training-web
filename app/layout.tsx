import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Park Personal Training | Profesyonel Fitness Studyosu",
  description: "Park Personal Training studyosunda uzman egitmenlerimizle hedeflerinize ulasin.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "tr";

  return (
    <html lang={locale} className={`${geist.variable} scroll-smooth`}>
      <head></head>
      <body className="bg-zinc-950 text-white antialiased">{children}</body>
    </html>
  );
}
