"use client";

// 1. React core library
import React from "react";

// 2. Styles
import "./addToCartButton.css";

// 3. Contexts
import { useCart } from "@/contexts/CartContext";

// 4. Types
import { AddToCartButtonProps } from "./types";

const AddToCartButton = (props: AddToCartButtonProps) => {
  // 1. Props destructuring
  const { productId, name, thumbnail } = props;

  // 2. Access addItem function from CartContext to add products to cart
  const { addItem } = useCart();

  // 3. Function to handle add to cart click event
  const handleAddToCart = () => {
    // Add the product with quantity 1 into the cart
    addItem({ productId, quantity: 1, name, thumbnailUrl: thumbnail });
  };

  // 4. Render button with accessibility label and styles
  return (
    <div
      onClick={() => handleAddToCart()}
      className="bg-cta hover:bg-primary text-background font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-highlight clickable"
      role="button"
      tabIndex={0}
      aria-label={`Add ${name || "product"} to Cart`}
    >
      Add to Cart
    </div>
  );
};

export default AddToCartButton;
