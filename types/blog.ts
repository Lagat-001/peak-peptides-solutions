export interface ContentSection {
  heading?: string;
  subheading?: string;
  paragraphs?: string[];
  list?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  publishedAt: string;
  readingTime: string;
  category: string;
  content: ContentSection[];
  relatedProducts: { name: string; slug: string }[];
}
