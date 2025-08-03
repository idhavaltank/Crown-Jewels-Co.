"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import "./productCard.css";

import AddToCartButton from "../AddToCartButton";

import { isValidImageUrl } from "@/helper";

import { NO_IMAGE_URL, PRIVATE_NAVIGATION } from "@/constants";

import { ProductCardPropsType } from "./types";

const ProductCard = (props: ProductCardPropsType) => {
  const { id, name, media, description, thumbnail } = props;

  const router = useRouter();
  const [isImageValid, setIsImageValid] = useState(true);
  const imageUrls = media?.map((m) => m.url) || [];
  const activeImage = imageUrls[0] || "";

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
    return () => {
      isMounted = false;
    };
  }, [activeImage]);

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
        <></>
      )}

      <h2
        className="text-text text-xl font-bold text-center mb-2"
        onClick={() => router.push(`${PRIVATE_NAVIGATION.PRODUCT.DETAIL(id)}`)}
      >
        {name}
      </h2>
      {description && (
        <p className="text-center mb-4 line-clamp-3">{description}</p>
      )}

      {/* Jewelry note */}
      <div className="italic text-secondary text-xs mb-3 text-center">
        Perfect gold jewelry for a special occasion or daily elegance.
      </div>
      {/* Add to cart */}
      <AddToCartButton productId={id} name={name} thumbnail={thumbnail} />
    </div>
  );
};

export default ProductCard;
