import type { Metadata } from "next";
import AboutContent from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About Us | Peak Peptides Solutions USA Sales",
  description:
    "Learn about Peak Peptides Solutions USA Sales — America's trusted source for HPLC-verified, research-grade peptides. Purity, precision, and reliability for the scientific community.",
};

export default function AboutPage() {
  return <AboutContent />;
}
