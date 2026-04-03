/**
 * Generate Google Merchant Center product feed CSV.
 * Run:  npx tsx scripts/generate-feed.ts
 * Output: public/products-feed.csv
 */

import { products } from "../lib/products";
import { writeFileSync } from "fs";
import { join } from "path";

const SITE = "https://peakpeptidessolutions.com";

const HEADERS = [
  "id",
  "title",
  "description",
  "link",
  "image_link",
  "price",
  "sale_price",
  "availability",
  "condition",
  "brand",
  "google_product_category",
  "product_type",
  "identifier_exists",
  "custom_label_0",
];

/** CSV-escape a value: wrap in quotes if it contains commas, quotes, or newlines. */
function esc(val: string): string {
  if (/[",\n\r]/.test(val)) return `"${val.replace(/"/g, '""')}"`;
  return val;
}

const rows = products.map((p) =>
  [
    esc(p.id),
    esc(p.name),
    esc(p.shortDescription),
    esc(`${SITE}/products/${p.slug}`),
    esc(`${SITE}/images/products/${p.imageFilename}`),
    `${p.originalPrice.toFixed(2)} USD`,
    `${p.salePrice.toFixed(2)} USD`,
    p.inStock ? "in_stock" : "out_of_stock",
    "new",
    esc("Peak Peptides Solutions"),
    esc("Health > Health Care"),
    esc(p.category),
    "no",
    esc(p.category),
  ].join(",")
);

const csv = [HEADERS.join(","), ...rows].join("\n");

const outPath = join(__dirname, "../public/products-feed.csv");
writeFileSync(outPath, csv, "utf-8");

console.log(`✓ Generated products-feed.csv with ${products.length} products`);
