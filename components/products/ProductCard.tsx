import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";

const categoryColors: Record<string, string> = {
  "GLP-1 Agonists": "bg-blue-100 text-blue-700",
  "Growth Hormone Peptides": "bg-green-100 text-green-700",
  "Healing & Recovery": "bg-orange-100 text-orange-700",
  "Cognitive & Nootropic": "bg-purple-100 text-purple-700",
  "Cosmetic Peptides": "bg-pink-100 text-pink-700",
  "Anti-Aging": "bg-teal-100 text-teal-700",
  "Fat Loss Research": "bg-red-100 text-red-700",
  "Immune Support": "bg-emerald-100 text-emerald-700",
  "Muscle Research": "bg-indigo-100 text-indigo-700",
  "Other Research Peptides": "bg-slate-100 text-slate-600",
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const badgeClass =
    categoryColors[product.category] ?? "bg-slate-100 text-slate-600";

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Image */}
      <div className="relative aspect-square bg-slate-50 overflow-hidden">
        <Image
          src={`/images/products/${product.imageFilename}`}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />
        {/* In-stock badge */}
        {product.inStock && (
          <span className="absolute top-3 right-3 px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
            In Stock
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Category badge */}
        <span
          className={`self-start px-2.5 py-0.5 text-xs font-semibold rounded-full ${badgeClass}`}
        >
          {product.category}
        </span>

        {/* Name */}
        <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-blue-700 transition-colors">
          {product.name}
        </h3>

        {/* Short description */}
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 flex-1">
          {product.shortDescription}
        </p>

        {/* Pricing */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-extrabold text-slate-900">
            {formatPrice(product.salePrice)}
          </span>
          <span className="text-sm text-slate-400 line-through">
            Was {formatPrice(product.originalPrice)}
          </span>
        </div>

        {/* CTA */}
        <Link
          href={`/products/${product.slug}`}
          className="mt-auto w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-blue-700 rounded-xl hover:bg-blue-800 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
