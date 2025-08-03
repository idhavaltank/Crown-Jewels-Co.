export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  variants: { id: string; name: string; sku: string }[];
  media: { url: string }[];
  thumbnail?: string;
}
