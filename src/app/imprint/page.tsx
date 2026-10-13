import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Imprint | Travyl",
  description: "Legal imprint for Travyl. Coming soon.",
};

export default function ImprintPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <ComingSoon
          eyebrow="Imprint"
          title="Our imprint is coming soon."
          description="Legal company details will be published here shortly."
        />
      </main>
      <Footer />
    </>
  );
}
