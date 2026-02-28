import type { Metadata } from "next";
import { products } from "@/lib/products";
import ProductsGrid from "@/components/products/ProductsGrid";

export const metadata: Metadata = {
  title: "All Research Peptides",
  description:
    "Browse our full collection of 24 premium HPLC-verified research peptides. Filter by category, shipped from the USA.",
};

export default function ProductsPage() {
  return <ProductsGrid products={products} />;
}
