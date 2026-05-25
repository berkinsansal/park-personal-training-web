export const dynamic = 'force-dynamic';

import { createAdminClient } from '@/lib/supabase-server';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Teachers from "@/components/Teachers";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default async function Home() {
  const db = createAdminClient();

  const [{ data: siteInfo }, { data: services }, { data: teachers }] = await Promise.all([
    db.from('site_info').select('*').single(),
    db.from('services').select('*').order('order_index'),
    db.from('teachers').select('*').order('order_index'),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About
          happyCustomers={siteInfo?.happy_customers ?? 0}
          yearsExperience={siteInfo?.years_experience ?? 0}
          teacherCount={teachers?.length ?? 0}
          serviceCount={services?.length ?? 0}
        />
        <Services services={services ?? []} />
        <Teachers teachers={teachers ?? []} />
        <Contact siteInfo={siteInfo} />
      </main>
      <Footer igHandle={siteInfo?.ig_handle ?? ''} />
    </>
  );
}
