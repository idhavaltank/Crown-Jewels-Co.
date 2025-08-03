export interface ProductVariantType {
  id: string;
  name: string;
  sku: string;
}

export interface ProductCardPropsType {
  id: string;
  name: string;
  thumbnail?: string;
  variants: ProductVariantType[];
  media: {
    url: string;
  }[];
  description?: string;
}
