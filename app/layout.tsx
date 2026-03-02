import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/chat/ChatBot";
import { products } from "@/lib/products";

const chatIndex = products.map((p) => ({
  name: p.name,
  slug: p.slug,
  category: p.category,
}));

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Peak Peptides Solutions USA Sales",
    template: "%s | Peak Peptides Solutions USA Sales",
  },
  description:
    "Premium research-grade peptides for the scientific community. HPLC verified purity, USA-sourced. Shop Semaglutide, BPC-157, Tirzepatide, and more.",
  keywords: [
    "research peptides",
    "semaglutide",
    "bpc-157",
    "tirzepatide",
    "peptides USA",
    "research chemicals",
    "HPLC verified peptides",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatBot productIndex={chatIndex} />
      </body>
    </html>
  );
}
