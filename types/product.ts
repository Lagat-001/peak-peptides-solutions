export type ProductCategory =
  | "GLP-1 Agonists"
  | "Growth Hormone Peptides"
  | "Healing & Recovery"
  | "Cognitive & Nootropic"
  | "Cosmetic Peptides"
  | "Anti-Aging"
  | "Fat Loss Research"
  | "Immune Support"
  | "Muscle Research"
  | "Other Research Peptides";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;

  // Specs (fully preserved from original site — populated on product detail pages)
  sequence?: string;
  molecularFormula?: string;
  molecularWeight?: string;
  purity: string;
  storage: string;
  form: string;
  solubility?: string;
  casNumber?: string;
  target?: string;

  // Pricing — salePrice = originalPrice - 40, set at data level
  originalPrice: number;
  salePrice: number;

  // Content
  shortDescription: string;
  fullDescription: string; // Full research paragraphs — added per product detail page
  disclaimer: string;
  coaUrl?: string;

  // Image — filename relative to /public/images/products/
  imageFilename: string;

  // Display
  featured: boolean;
  inStock: boolean;
}
