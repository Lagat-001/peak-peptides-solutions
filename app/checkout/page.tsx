import type { Metadata } from "next";
import CheckoutContent from "@/components/checkout/CheckoutContent";

export const metadata: Metadata = {
  title: "Checkout | Peak Peptides Solutions USA Sales",
  description:
    "Securely complete your research peptide order with cryptocurrency. Peak Peptides Solutions USA Sales accepts Bitcoin, USDT (TRC20), and Ethereum.",
};

export default function CheckoutPage() {
  return <CheckoutContent />;
}
