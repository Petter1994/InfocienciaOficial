import { Metadata } from "next";
import Hero from "@/components/Hero";
import Feature from "@/components/Features";
import About from "@/components/About";
import FeaturesTab from "@/components/FeaturesTab";
import FunFact from "@/components/FunFact";
import Integration from "@/components/Integration";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";



export const metadata: Metadata = {
  title: "Infociencia UH",

  // other metadata
  description: "Infociencia UH"
};

export default function Home() {
  return (
    
      <main>
        <Hero />
        <Feature />
        <About />
        <FeaturesTab />
        <FunFact />
        <Integration />
        <CTA />
        <FAQ />
        <Contact />
      </main>

  );
}
