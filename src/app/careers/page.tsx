import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Careers | Travyl",
  description: "Join the Travyl team. Open roles coming soon.",
};

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <ComingSoon
          eyebrow="Careers"
          title="We're building our team."
          description="Open roles at Travyl aren't live yet, but we're growing fast. Check back soon or reach out directly if you'd like to be part of it."
        />
      </main>
      <Footer />
    </>
  );
}
