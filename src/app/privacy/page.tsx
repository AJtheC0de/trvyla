import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Privacy Policy | Travyl",
  description: "Privacy policy for Travyl. Coming soon.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <ComingSoon
          eyebrow="Privacy Policy"
          title="Our privacy policy is coming soon."
          description="We're finalizing the details on how we handle your data. The full policy will be published here shortly."
        />
      </main>
      <Footer />
    </>
  );
}
