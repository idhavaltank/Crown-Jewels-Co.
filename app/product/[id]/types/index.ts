// Individual price and currency
export interface GrossPrice {
  amount: number;
  currency: string;
}

export interface Price {
  gross: GrossPrice;
}

export interface PriceUndiscounted {
  gross: GrossPrice;
}

// Pricing structure for a product or variant
export interface Pricing {
  priceUndiscounted?: PriceUndiscounted;
  price: Price;
}

// Attribute value (e.g. "16K Yellow Gold")
export interface AttributeValue {
  id: string;
  name: string;
}

export interface Attribute {
  id: string;
  name: string;
}

export interface VariantAttribute {
  attribute: Attribute;
  values: AttributeValue[];
}

// Product images/media
export interface Media {
  id: string;
  url: string;
  alt?: string;
  type?: string;
}

// Category details
export interface Category {
  id: string;
  name: string;
  slug: string;
}

// Product type details
export interface ProductType {
  id: string;
  name: string;
}

// Product variant details
export interface Variant {
  id: string;
  name: string;
  sku: string;
  pricing: Pricing;
  attributes: VariantAttribute[];
}

// Main product object
export interface ProductDetail {
  id: string;
  name: string;
  slug: string;
  thumbnail?: string;
  description?: string;
  seoTitle?: string;
  seoDescription?: string;
  defaultVariant?: Variant;
  variants: Variant[];
  media: Media[];
  attributes: VariantAttribute[];
  category?: Category;
  productType?: ProductType;
  isAvailableForPurchase: boolean;
  availableForPurchase?: string;
}
