"use client";

import React from "react";
import "./addToCartButton.css";

import { useCart } from "@/contexts/CartContext";

import { AddToCartButtonProps } from "./types";

const AddToCartButton = (props: AddToCartButtonProps) => {
  const { productId, name, thumbnail } = props;
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({ productId, quantity: 1, name, thumbnailUrl: thumbnail });
  };

  return (
    <div
      onClick={() => handleAddToCart()}
      className="bg-cta hover:bg-primary text-background font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-highlight clickable"
      aria-label={`Add ${name || "product"} to Cart`}
    >
      Add to Cart
    </div>
  );
};

export default AddToCartButton;
