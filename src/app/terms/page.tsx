import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Terms & Conditions | Travyl",
  description: "Terms and conditions for using Travyl. Coming soon.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <ComingSoon
          eyebrow="Terms & Conditions"
          title="Our terms are coming soon."
          description="The full terms and conditions for using Travyl will be published here shortly."
        />
      </main>
      <Footer />
    </>
  );
}
