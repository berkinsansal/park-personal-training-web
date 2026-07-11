import Footer from '@/app/[locale]/_components/Footer';
import Navbar from '@/app/[locale]/_components/Navbar';
import { getSiteInfo } from '@/lib/data';

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteInfo = await getSiteInfo();

  return (
    <>
      <Navbar siteInfo={siteInfo} />
      <main>
        {children}
      </main>
      <Footer igHandle={siteInfo.ig_handle ?? ''} />
    </>
  );
}
