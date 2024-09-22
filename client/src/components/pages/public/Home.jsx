import React, { useRef } from "react";
import { useAnimation } from "framer-motion";
import HeroSection from "@/components/molecules/Home/HeroSection";
import BenefitsSection from "@/components/molecules/Home/BenefitsSection";
import TestimonialsSection from "@/components/molecules/Home/TestimonialsSection";
import FAQSection from "@/components/molecules/Home/FAQSection";
import FeaturedProducts from "@/components/molecules/Home/FeaturedProducts";
import CallToAction from "@/components/molecules/Home/CallToAction";
import CustomCursor from "@/components/molecules/Home/CustomCursor";


const HomePage = () => {
  const controls = useAnimation();
  const scrollRef = useRef(null);

  const scrollToNextSection = () => {
    controls.start({ y: -10 });
    setTimeout(() => {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  return (
    <div>
      <CustomCursor />
      {/* Hero Section */}
      <HeroSection controls={controls} onClick={scrollToNextSection} />
      
      {/* Featured Products */}
      <FeaturedProducts />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Call To Action */}
      <CallToAction />

      {/* FAQ Section */}
      <div ref={scrollRef}>
        <FAQSection />
      </div>
    </div>
  );
};

export default HomePage;
