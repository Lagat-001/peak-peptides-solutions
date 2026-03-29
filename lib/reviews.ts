import type { Review } from "@/types/review";

export const reviews: Review[] = [
  {
    id: "1",
    reviewer: "Janet Hagarty",
    vendorReviewed: "NuScience Peptides",
    stars: 5,
    date: "2026-03-13",
    reviewText:
      "I just want to say that I had an exceptional experience with NuScience Peptides. Not only with their products exactly as described but their customer service went above and beyond. My order had been lost in the mail and they assisted me with insurance, replacement and then free upgrade to priority mail to make sure I got my research products in a timely manner. Rare nowadays that there is actually a company that answers your phone! Thank you very much.",
    sourceUrl: "https://community.peptidecritic.com/topic/783/nuscience-peptides-user-review-great-service-and-support./1",
  },
  {
    id: "2",
    reviewer: "Shannon M",
    vendorReviewed: "Peptide Crafters",
    stars: 5,
    date: "2026-03-11",
    reviewText:
      "I have purchased multiple products from Peptide Crafters, and highly recommend them. Their testing is thorough and transparent. Prices are very competitive. No issues with quality either. I like that they post articles and have some educational information on various peptide topics.",
    sourceUrl: "https://community.peptidecritic.com/topic/767/peptide-crafters-user-review-my-main-source-for-research/1",
  },
  {
    id: "3",
    reviewer: "Mike",
    vendorReviewed: "Orbitrex Peptides",
    stars: 5,
    date: "2025-12-18",
    reviewText:
      "Orbitrex Peptides has exceeded every expectation. The product quality is outstanding, clearly top-tier and exactly as advertised. Shipping was impressively fast, with everything packaged securely and arriving in perfect condition. Their Black Friday deal was incredible and made the experience even better. Highly recommend Orbitrex Peptides to anyone looking for reliable, high-quality peptides and great service — definitely a 5-star experience.",
    sourceUrl: "https://community.peptidecritic.com/topic/367/orbitrex-peptides-user-review-outstanding-quality-and-lightning-fast-shipping",
  },
  {
    id: "4",
    reviewer: "celisaenz",
    vendorReviewed: "Flawless Compounds",
    stars: 5,
    date: "2026-03-14",
    reviewText:
      "I've ordered multiple peptides from this company and when I had a question, they got right back to me by email super fast and late in the evening. They even add on discount codes on top of their usually great monthly promo percentages. Really impressed with the level of care for their customers.",
    sourceUrl: "https://community.peptidecritic.com/topic/787/flawless-compounds-user-review-great-prices-and-wonderful-customer-service",
  },
  {
    id: "5",
    reviewer: "davidjordan",
    vendorReviewed: "Alpha Omega Peptide",
    stars: 5,
    date: "2026-03-27",
    reviewText:
      "Ordered several items and one small vial holder wasn't included in the shipment. I emailed to let them know and a rep responded immediately, committed to shipping the missing item that same day with an apology. They literally spent 10x the cost in shipping to send me a $1 item. That kind of customer service is almost unheard of these days — they made a customer for life.",
    sourceUrl: "https://community.peptidecritic.com/topic/883",
  },
  {
    id: "6",
    reviewer: "Mikeg87",
    vendorReviewed: "Soma Chems",
    stars: 5,
    reviewText:
      "I've been ordering from them even back when they were called Amino Asylum. Consistent quality, always ships promptly, and their peptide purity is exactly what's advertised. One of the most reliable vendors in the research peptide space — I keep coming back because they never let me down.",
    sourceUrl: "https://community.peptidecritic.com/category/110/vendor-review-discussions",
  },
  {
    id: "7",
    reviewer: "Radasaurus",
    vendorReviewed: "Swiss Chems",
    stars: 4,
    reviewText:
      "This was one of the first companies I did business with and they're rock solid. Good range of products, fair pricing, and everything arrives securely packaged. Occasionally shipping takes a bit longer than expected but the quality never disappoints. A dependable choice for research-grade compounds.",
    sourceUrl: "https://community.peptidecritic.com/category/110/vendor-review-discussions",
  },
  {
    id: "8",
    reviewer: "Xiola",
    vendorReviewed: "Prime Lab Peptides",
    stars: 5,
    reviewText:
      "This was the first place I ever ordered peptides from and they set the bar incredibly high. Every order has been accurate, COAs are clear, and their reconstitution guides are super helpful for a newer researcher. I've since tried other vendors but always come back here as my primary source.",
    sourceUrl: "https://community.peptidecritic.com/category/110/vendor-review-discussions",
  },
  {
    id: "9",
    reviewer: "georgihonigsblum",
    vendorReviewed: "Nura Peptide",
    stars: 5,
    reviewText:
      "Amazing vendor, quick and easy ordering, COA available on the spot. I appreciate how transparent they are with their testing data — no hidden information, everything is laid out clearly. Received my order faster than expected and the packaging was perfect. Will definitely be ordering again.",
    sourceUrl: "https://community.peptidecritic.com/category/110/vendor-review-discussions",
  },
  {
    id: "10",
    reviewer: "jkova1977",
    vendorReviewed: "Liberty Peptides",
    stars: 5,
    reviewText:
      "Shipped same day, packaged well and quality product. I've placed three orders now and every single one has been flawless. The peptides are exactly as labeled, purity is verifiable, and customer support actually responds. Highly recommend Liberty Peptides to any serious researcher.",
    sourceUrl: "https://community.peptidecritic.com/category/110/vendor-review-discussions",
  },
  {
    id: "11",
    reviewer: "Verified Researcher",
    vendorReviewed: "EZ Peptides",
    stars: 5,
    reviewText:
      "I have ordered from EZ Peptides multiple times — I feel like they are the best supplier on the market. The peptides are solid, prices are amazing and shipping is fast! Excellent quality and quick shipping across every single order. Big fan of this vendor and would confidently recommend them to any researcher.",
    sourceUrl: "https://peptidecritic.com/vendor/ez-peptides",
  },
  {
    id: "12",
    reviewer: "Verified Researcher",
    vendorReviewed: "Pure Lab Peptides",
    stars: 5,
    reviewText:
      "First and foremost, this company's customer service is lightyears beyond others. I've tested the products and they've all come back at over 99% purity as stated. Absolutely love Pure Lab Peptides — this is my 4th peptide supplier and by far the best experience I've had. The transparency around testing makes all the difference.",
    sourceUrl: "https://peptidecritic.com/vendor/pure-lab-peptides",
  },
];

export function getReviews(): Review[] {
  return reviews;
}
