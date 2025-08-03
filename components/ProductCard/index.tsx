"use client";

// 1. React and related libraries
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// 2. Styles
import "./productCard.css";

// 3. Components
import AddToCartButton from "../AddToCartButton";

// 4. Helper utilities
import { isValidImageUrl } from "@/helper";

// 5. Constants
import { NO_IMAGE_URL, PRIVATE_NAVIGATION } from "@/constants";

// 6. Types
import { ProductCardPropsType } from "./types";

const ProductCard = (props: ProductCardPropsType) => {
  // 1. Props destructuring
  const { id, name, media, description, thumbnail } = props;

  // 2. Variables / state
  const router = useRouter();

  // State to track if the current active image URL is valid
  const [isImageValid, setIsImageValid] = useState(true);

  // Extract URLs from media array, fallback to empty array if undefined
  const imageUrls = media?.map((m) => m.url) || [];

  // Use the first image URL as the active image to display
  const activeImage = imageUrls[0] || "";

  // 3. useEffect hook to asynchronously validate activeImage URL on change
  useEffect(() => {
    let isMounted = true;

    async function validateImage() {
      if (!activeImage) {
        if (isMounted) setIsImageValid(false);
        return;
      }
      const valid = await isValidImageUrl({ url: activeImage });
      if (isMounted) setIsImageValid(valid);
    }

    validateImage();

    // Cleanup function to avoid state update if component unmounts
    return () => {
      isMounted = false;
    };
  }, [activeImage]);

  // 4. Return JSX
  return (
    <div className="bg-card border border-border rounded-lg shadow-lg p-6 flex flex-col items-center justify-between max-w-md mx-auto transition-shadow hover:shadow-xl">
      {/* Main image */}
      {activeImage ? (
        <div className="w-full mb-4">
          <Image
            priority
            width={400}
            height={300}
            alt={`${name} - image`}
            className="rounded-lg object-cover w-full"
            style={{ minHeight: 250, objectFit: "cover" }}
            src={isImageValid ? activeImage : NO_IMAGE_URL}
          />
        </div>
      ) : (
        // Render nothing if no active image URL
        <></>
      )}

      {/* Product name clickable to navigate to product detail page */}
      <h2
        className="text-text text-xl font-bold text-center mb-2 cursor-pointer"
        onClick={() => router.push(`${PRIVATE_NAVIGATION.PRODUCT.DETAIL(id)}`)}
      >
        {name}
      </h2>

      {/* Optional description truncated to 3 lines */}
      {description && (
        <p className="text-center mb-4 line-clamp-3">{description}</p>
      )}

      {/* Fixed note about jewelry */}
      <div className="italic text-secondary text-xs mb-3 text-center">
        Perfect gold jewelry for a special occasion or daily elegance.
      </div>

      {/* Add to cart button with product info */}
      <AddToCartButton productId={id} name={name} thumbnail={thumbnail} />
    </div>
  );
};

export default ProductCard;
