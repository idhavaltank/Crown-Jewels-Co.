"use client";

// 1. React core libraries
import React, { useEffect, useState } from "react";
import Image from "next/image";

// 2. Helper utilities
import { isValidImageUrl } from "@/helper";

// 3. Types
import { CartItemRowPropsType } from "./types";

// 4. Constants
import { NO_IMAGE_URL } from "@/constants";

// 5. Contexts
import { useCart } from "@/contexts/CartContext";

const CartItemRow = ({
  productId,
  name,
  thumbnailUrl,
  quantity,
}: CartItemRowPropsType) => {
  // 2. Variables / state
  // Get cart context methods for updating/removing items
  const { removeItem, updateItemQuantity } = useCart();

  // State to track if the product image URL is valid
  const [isImageValid, setIsImageValid] = useState(true);

  // 4. Functions

  // Handle quantity input change, updating cart item quantity
  const handleQuantityChange = (productId: string, quantity: number) => {
    updateItemQuantity({ productId, quantity });
  };

  // Handle removal of item from cart
  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
  };

  // 3. useEffect - validate image url on thumbnail change
  useEffect(() => {
    let isMounted = true;

    // Async image URL validation
    async function validate() {
      if (thumbnailUrl) {
        const valid = await isValidImageUrl({ url: thumbnailUrl });
        if (isMounted) setIsImageValid(valid);
      } else {
        setIsImageValid(false);
      }
    }

    validate();

    // Cleanup function to avoid state update if unmounted
    return () => {
      isMounted = false;
    };
  }, [thumbnailUrl]);

  // 5. Return JSX

  // Fallback UI if product name unavailable
  if (!name) {
    return (
      <li className="flex items-center justify-between py-4">
        <p className="text-text font-medium">Product information unavailable</p>

        <button
          onClick={() => handleRemoveItem(productId)}
          className="px-4 py-2 bg-error text-background rounded hover:bg-rose-600"
          aria-label="Remove unknown product from cart"
          type="button"
        >
          Remove
        </button>
      </li>
    );
  }

  // Normal render for cart item row
  return (
    <li className="flex items-center justify-between py-4 mr-3">
      <div className="flex items-center space-x-4 mr-2">
        <div className="relative w-20 h-20 rounded overflow-hidden border border-border bg-gray-50">
          <Image
            src={isImageValid && thumbnailUrl ? thumbnailUrl : NO_IMAGE_URL}
            alt={name || "No Image"}
            fill
            sizes="80px"
            className="object-cover"
            priority={false}
          />
        </div>
        <p className="text-text font-medium">{name}</p>
      </div>

      <div className="flex items-center space-x-4 mr-2">
        <input
          type="number"
          className="w-20 p-2 border border-border rounded text-center"
          min={1}
          value={quantity}
          onChange={(e) =>
            handleQuantityChange(productId, Number(e.target.value))
          }
          aria-label={`Quantity for product ${name}`}
        />

        <button
          onClick={() => handleRemoveItem(productId)}
          className="px-4 py-2 bg-error text-background rounded hover:bg-primary"
          aria-label={`Remove product ${name} from cart`}
          type="button"
        >
          Remove
        </button>
      </div>
    </li>
  );
};

export default CartItemRow;
