import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Press | Travyl",
  description: "Press resources and media contacts for Travyl. Coming soon.",
};

export default function PressPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <ComingSoon
          eyebrow="Press"
          title="Our press kit is on its way."
          description="Media resources, brand assets, and contact details for press inquiries will be available here soon."
        />
      </main>
      <Footer />
    </>
  );
}
