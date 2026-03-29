import type { Metadata } from "next";
import CartContent from "@/components/cart/CartContent";

export const metadata: Metadata = {
  title: "Cart | Peak Peptides Solutions USA Sales",
  description: "Review your research peptide order before proceeding to crypto checkout.",
};

export default function CartPage() {
  return <CartContent />;
}
