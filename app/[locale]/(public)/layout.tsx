import { Suspense, ViewTransition } from "react";
import { getSiteInfo } from "@/lib/data";
import Navbar from "@/app/[locale]/_components/Navbar";
import Footer from "@/app/[locale]/_components/Footer";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteInfo = await getSiteInfo();

  return (
    <>
      <Navbar />
      <main>
        <ViewTransition default="page-slices">
          {children}
        </ViewTransition>
      </main>
      <Footer igHandle={siteInfo.ig_handle ?? ''} />
    </>
  );
}
