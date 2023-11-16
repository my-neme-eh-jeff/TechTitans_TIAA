"use client";
//third party
import Aos from "aos";
import { useEffect } from "react";
import { Divider } from "@nextui-org/divider";

//sections
import AboutSection from "./_components/AboutSection";
import FAQSection from "./_components/FAQSection";
import HeroSection from "./_components/HeroSection";
import PricingSection from "./_components/PricingSection";

export default function HomePage() {
  useEffect(() => {
    Aos.init({ duration: 1000, once: true, easing: "ease", offset: 60 });
  }, []);

  return (
    <>
      <div id="hero" className="relative md:h-screen">
        <HeroSection />
      </div>
      <div className="absolute overflow-hidden md:h-screen -z-10 inset-0 inset-y-[5px] w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_2px),linear-gradient(to_bottom,#80808012_1px,transparent_2px)] bg-[size:24px_24px]"></div>
      <Divider className="hidden md:block md:absolute top-full" />
      <div className="mt-20 overflow-x-hidden" id="about">
        <AboutSection />
      </div>
      <Divider className="mb-24 mt-32" />
      <div className="pb-12" id="faq">
        <FAQSection />
      </div>
      <div className="mb-36 overflow-x-hidden" id="pricing">
        <PricingSection />
      </div>
    </>
  );
}
