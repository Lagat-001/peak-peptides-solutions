import type { Metadata } from "next";
import ContactContent from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us | Peak Peptides Solutions USA Sales",
  description:
    "Contact Peak Peptides Solutions USA Sales — America's trusted source for research-grade peptides. Send us a message for research inquiries or support.",
};

export default function ContactPage() {
  return <ContactContent />;
}
