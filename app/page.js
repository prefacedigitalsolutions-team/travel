import Navbar from '@/components/Navbar/Navbar';
import HeroBanner from '@/components/Home/HeroBanner';
import AboutSection from '@/components/Home/AboutSection';
import ServicesSection from '@/components/Home/ServicesSection';
import PackagesSection from '@/components/Home/PackagesSection';
import EnquirySection from '@/components/Home/EnquirySection';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroBanner />
      <AboutSection />
      <ServicesSection />
      <PackagesSection />
      <EnquirySection />
      <Footer />
    </main>
  );
}