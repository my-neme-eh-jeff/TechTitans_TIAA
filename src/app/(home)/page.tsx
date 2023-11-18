//third party
import dynamic from "next/dynamic";
import { Spinner } from "@nextui-org/react";

//sections
import AboutSection from "./_components/AboutSection";
import HeroSection from "./_components/HeroSection";
const FAQSection = dynamic(() => import("./_components/FAQSection"), {
  loading: () => (
    <div className="flex justify-center align-middle ">
      <Spinner color="primary" />
    </div>
  ),
  ssr: false,
});
const PricingSection = dynamic(() => import("./_components/PricingSection"), {
  loading: () => (
    <div className="flex justify-center align-middle ">
      <Spinner color="primary" />
    </div>
  ),
  ssr: false,
});

export default function HomePage() {

  return (
    <>
      <div id="hero" className="md:h-[500px] lg:h-[742px] xl:h-screen">
        <HeroSection />
      </div>
      <div className="mt-20 overflow-x-hidden" id="about">
        <AboutSection />
      </div>
      <div className="pb-12" id="faq">
        <FAQSection />
      </div>
      <div className="mb-36 overflow-x-hidden" id="pricing">
        <PricingSection />
      </div>
    </>
  );
}
