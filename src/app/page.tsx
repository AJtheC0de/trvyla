import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PlatformStory from "@/components/PlatformStory";
import AppFlowShowcase from "@/components/app-flow/AppFlowShowcase";
import ExperienceShowcase from "@/components/ExperienceShowcase";
import HostWorkspace from "@/components/HostWorkspace";
import SocialProof from "@/components/SocialProof";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <PlatformStory />
        <AppFlowShowcase />
        <ExperienceShowcase />
        <HostWorkspace />
        <SocialProof />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
