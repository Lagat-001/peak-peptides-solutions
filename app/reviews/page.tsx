import type { Metadata } from "next";
import ReviewsContent from "@/components/reviews/ReviewsContent";
import { reviews } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Research Peptide Community Reviews | Peak Peptides Solutions USA Sales",
  description:
    "Real reviews from the research peptide community. Sourced from PeptideCritic.com — the independent research peptide review platform trusted by researchers worldwide.",
  openGraph: {
    title: "Research Peptide Community Reviews | Peak Peptides Solutions USA Sales",
    description:
      "Real reviews from the research peptide community. Sourced from PeptideCritic.com.",
  },
};

export default function ReviewsPage() {
  return <ReviewsContent reviews={reviews} />;
}
