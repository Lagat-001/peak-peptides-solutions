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

/** Shorten an ID to ≤50 chars, cutting at hyphen boundaries. */
function shortenId(id: string, maxLen = 50): string {
  if (id.length <= maxLen) return id;
  // Truncate to maxLen then cut back to last hyphen for a clean break
  const truncated = id.slice(0, maxLen);
  const lastHyphen = truncated.lastIndexOf("-");
  return lastHyphen > 10 ? truncated.slice(0, lastHyphen) : truncated;
}

// Build unique short IDs
const shortIds = new Map<string, string>();
const usedIds = new Set<string>();
for (const p of products) {
  let sid = shortenId(p.id);
  if (usedIds.has(sid)) {
    // Add numeric suffix to resolve collision
    let i = 2;
    while (usedIds.has(`${sid}-${i}`)) i++;
    sid = `${sid}-${i}`;
  }
  usedIds.add(sid);
  shortIds.set(p.id, sid);
}

const rows = products.map((p) =>
  [
    esc(shortIds.get(p.id)!),
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
