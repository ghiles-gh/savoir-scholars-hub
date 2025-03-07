
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import PricingSection from '@/components/PricingSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import DemoSection from '@/components/DemoSection';
import Footer from '@/components/Footer';

const Index = () => {
  // Update page title and meta description for SEO
  useEffect(() => {
    document.title = "EduTrack | Detailed Reports for Private Schools";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'EduTrack is an innovative platform that enables private schools to send detailed reports to parents after each class session, enhancing communication and student progress tracking.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <DemoSection />
      <Footer />
    </div>
  );
};

export default Index;
