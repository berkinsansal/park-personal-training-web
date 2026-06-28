import Footer from '@/app/[locale]/_components/Footer';
import Navbar from '@/app/[locale]/_components/Navbar';
import { getSiteInfo } from '@/lib/data';
import { ViewTransition } from 'react';

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
        <ViewTransition default="page-slices">{children}</ViewTransition>
      </main>
      <Footer igHandle={siteInfo.ig_handle ?? ''} />
    </>
  );
}
