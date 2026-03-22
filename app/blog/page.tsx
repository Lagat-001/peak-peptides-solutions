import type { Metadata } from "next";
import BlogListContent from "@/components/blog/BlogListContent";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Research Peptides Blog | Peak Peptides Solutions USA Sales",
  description:
    "Expert articles on peptide research, mechanisms of action, and scientific findings. Written for researchers by Peak Peptides Solutions USA Sales.",
};

export default function BlogPage() {
  return <BlogListContent posts={blogPosts} />;
}
