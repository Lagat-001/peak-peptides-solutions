export interface Review {
  id: string;
  reviewer: string;
  vendorReviewed: string;
  stars: number;
  date?: string;
  productMentioned?: string;
  reviewText: string;
  sourceUrl: string;
}
