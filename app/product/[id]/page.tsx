"use client";

// 1. React and related libraries
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";

// 2. Styles
import "./productDetail.css";

// 3. Components
import AddToCartButton from "@/components/AddToCartButton";

// 4. Redux selectors
import { getProductByID } from "@/Redux/slices/productsSlice";

// 5. Services / hooks
import { useGetProductDetail } from "@/services/products.service";

// 6. Constants / config
import { PRIVATE_NAVIGATION } from "@/constants";
import { PRODUCT_ATTRIBUTES } from "./constants";

// 7. Types
import { Media, ProductDetail, Variant } from "./types";

const ProductDetailPage = () => {
  // 2. Variables / State

  // Get the product ID from URL params
  const { id } = useParams();

  // Access Redux slice for product details by ID
  const productByID = useSelector(getProductByID);

  // Hook to fetch detailed product data
  const { fetchProduct, error, isLoading } = useGetProductDetail();

  // Local state to hold detailed product data fetched
  const [data, setData] = useState<ProductDetail | undefined>(undefined);

  // 4. Functions

  // Fetch product detail by slug from productByID mapping
  const setProductData = async () => {
    if (typeof id === "string") {
      const product = productByID?.[id];
      if (product?.name) {
        const { data } = await fetchProduct({ slug: product.name });
        setData(data?.product);
      }
    }
  };

  // 3. useEffect to fetch product data on component mount or id change
  useEffect(() => {
    setProductData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // 5. Return JSX rendering and conditional UI states

  // Show loading text while fetching
  if (isLoading) {
    return <p className="text-center mt-12">Loading...</p>;
  }

  // Display error message if any error occurred during fetch
  if (error) {
    return <p className="text-center mt-12 text-error">Error: {error}</p>;
  }

  // Show fallback if product data not found (e.g. invalid product id)
  if (!data) {
    return <p className="text-center mt-12">Product not found</p>;
  }

  // Destructure product detail data object
  const product: ProductDetail = data;
  const {
    name,
    slug,
    thumbnail,
    seoTitle,
    seoDescription,
    defaultVariant,
    variants,
    media = [],
    attributes = [],
    category,
    productType,
    isAvailableForPurchase,
    availableForPurchase,
  } = product;

  // Use first media as main image fallback
  const mainImage: Media | null = media.length > 0 ? media[0] : null;

  return (
    <article className="product-detail max-w-7xl mx-auto my-12 p-6 bg-card rounded-lg border border-border shadow-lg">
      {/* SEO Information */}
      <section className="seo-info mb-6">
        <h2 className="seo-title text-highlight font-serif tracking-wide">
          {seoTitle || name}
        </h2>
        {seoDescription && (
          <p className="seo-description text-secondary italic mt-1">
            {seoDescription}
          </p>
        )}
      </section>

      {/* Header with main image and product info/details */}
      <header className="product-header flex flex-col md:flex-row gap-8">
        {/* Main product image */}
        {mainImage && (
          <div className="image-wrapper relative w-full md:w-1/2 rounded overflow-hidden shadow-xl">
            <Image
              src={mainImage.url}
              alt={mainImage.alt || name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded"
              priority
            />
          </div>
        )}

        {/* Product info: name, slug, pricing, add-to-cart */}
        <div className="product-info flex flex-col flex-1 text-text">
          <h1 className="text-4xl font-bold mb-3 font-serif">{name}</h1>
          <p className="slug uppercase tracking-widest text-secondary mb-4">
            Slug: {slug}
          </p>

          {/* Purchase availability and pricing */}
          <div className="purchase-info mb-6">
            <p
              className={`availability mb-2 ${
                isAvailableForPurchase ? "text-success" : "text-error"
              }`}
            >
              {isAvailableForPurchase
                ? "Available for Purchase"
                : "Currently Unavailable"}
            </p>

            {defaultVariant?.pricing && (
              <div>
                <p className="price-label font-semibold text-lg mb-1">
                  Default Variant Pricing
                </p>
                <div className="flex items-center gap-4">
                  {defaultVariant.pricing.priceUndiscounted?.gross &&
                    defaultVariant.pricing.price.gross && (
                      <>
                        <span className="price-undiscounted line-through text-muted mr-2">
                          {
                            defaultVariant.pricing.priceUndiscounted.gross
                              .currency
                          }{" "}
                          {defaultVariant.pricing.priceUndiscounted.gross.amount.toFixed(
                            2
                          )}
                        </span>
                        <span className="price-discounted text-highlight font-bold text-xl">
                          {defaultVariant.pricing.price.gross.currency}{" "}
                          {defaultVariant.pricing.price.gross.amount.toFixed(2)}
                        </span>
                      </>
                    )}
                  {!defaultVariant.pricing.priceUndiscounted?.gross && (
                    <span className="price text-highlight font-bold text-xl">
                      {defaultVariant.pricing.price.gross.currency}{" "}
                      {defaultVariant.pricing.price.gross.amount.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Add to Cart button */}
          <AddToCartButton
            productId={product.id}
            name={name}
            thumbnail={thumbnail}
          />
        </div>
      </header>

      {/* Media gallery */}
      <section className="media-gallery mt-12">
        <h3 className="section-title mb-4">Gallery</h3>
        <div className="gallery flex gap-4 overflow-x-auto">
          {media.length ? (
            media.map((m: Media) => (
              <div
                key={m.id}
                className="media-item flex-shrink-0 rounded overflow-hidden shadow-md w-48 h-32 relative"
              >
                <Image
                  src={m.url}
                  alt={m.alt || name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 200px, 192px"
                  priority={false}
                />
              </div>
            ))
          ) : (
            <p className="text-muted">No media available.</p>
          )}
        </div>
      </section>

      {/* Attributes section */}
      <section className="attributes mt-12">
        <h3 className="section-title mb-4">Attributes</h3>
        {attributes.length > 0 ? (
          <div className="attributes-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {attributes
              .filter(
                ({ attribute }) =>
                  ![
                    PRODUCT_ATTRIBUTES.THUMB_NAIL,
                    PRODUCT_ATTRIBUTES.THUMB_NAIL_HOVERD,
                  ].includes(attribute.name)
              )
              .map(({ attribute, values }) => {
                return (
                  <div
                    key={attribute.id}
                    className="attribute-card bg-color-card p-4 rounded-md shadow"
                  >
                    <h4 className="attribute-name font-semibold text-primary mb-2">
                      {attribute.name}
                    </h4>
                    <ul className="attribute-values list-disc list-inside text-text text-sm">
                      {values.map((v: { id: string; name: string }) =>
                        attribute.name ===
                        PRODUCT_ATTRIBUTES.RELATED_PRODUCTS ? (
                          <Link
                            key={v.id}
                            href={PRIVATE_NAVIGATION.PRODUCT.DETAIL(v.id)}
                          >
                            <li>{v.name}</li>
                          </Link>
                        ) : (
                          <li key={v.id}>{v.name}</li>
                        )
                      )}
                    </ul>
                  </div>
                );
              })}
          </div>
        ) : (
          <p className="text-muted">No attributes specified.</p>
        )}
      </section>

      {/* Variants section */}
      <section className="variants mt-12">
        <h3 className="section-title mb-6">Variants</h3>
        {variants.length > 0 ? (
          <div className="variants-grid grid grid-cols-1 md:grid-cols-2 gap-6">
            {variants.map((variant: Variant) => {
              const price = variant.pricing?.price?.gross;
              return (
                <div
                  key={variant.id}
                  className="variant-card bg-color-card p-5 rounded-lg shadow-md"
                >
                  <h4 className="variant-name font-semibold text-highlight mb-1">
                    {variant.name}
                  </h4>
                  <p className="sku text-muted text-sm mb-2">
                    SKU: {variant.sku}
                  </p>
                  {price && (
                    <p className="price font-bold text-primary mb-2">
                      {price.currency} {price.amount.toFixed(2)}
                    </p>
                  )}
                  {variant.attributes.length > 0 && (
                    <div className="variant-attributes mb-2">
                      {variant.attributes.map(({ attribute, values }) => (
                        <div
                          key={attribute.id}
                          className="variant-attribute flex flex-wrap gap-x-1 gap-y-0.5"
                        >
                          <span className="attr-name font-semibold text-secondary mr-1">
                            {attribute.name}:
                          </span>
                          {values.map((v) => (
                            <span
                              key={v.id}
                              className="attr-value bg-highlight/10 text-highlight px-2 rounded-sm text-xs font-medium"
                            >
                              {v.name}
                            </span>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-muted">No variants found.</p>
        )}
      </section>

      {/* Category and Product Type */}
      <section className="category-type mt-12 flex flex-wrap gap-8 text-secondary text-sm">
        <div>
          <strong>Category:</strong> {category?.name || "N/A"}
        </div>
        <div>
          <strong>Product Type:</strong> {productType?.name || "N/A"}
        </div>
      </section>

      {/* Purchase Availability Info */}
      <section className="purchase-availability mt-8 text-center">
        <p
          className={`font-semibold ${
            isAvailableForPurchase ? "text-success" : "text-error"
          }`}
        >
          {isAvailableForPurchase
            ? "Product is available for purchase."
            : "Product is not currently available for purchase."}
        </p>
        {availableForPurchase && (
          <p className="text-sm mt-1 text-muted">
            Available for purchase from:{" "}
            {new Date(availableForPurchase).toLocaleDateString()}
          </p>
        )}
      </section>
    </article>
  );
};

export default ProductDetailPage;
