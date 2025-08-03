"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { isValidImageUrl } from "@/helper";
import { CartItemRowPropsType } from "./types";
import { NO_IMAGE_URL } from "@/constants";
import { useCart } from "@/contexts/CartContext";

const CartItemRow = ({
  productId,
  name,
  thumbnailUrl,
  quantity,
}: CartItemRowPropsType) => {
  const { removeItem, updateItemQuantity } = useCart();

  const [isImageValid, setIsImageValid] = useState(true);

  const handleQuantityChange = (productId: string, quantity: number) => {
    updateItemQuantity({ productId, quantity });
  };

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
  };

  useEffect(() => {
    let isMounted = true;
    async function validate() {
      if (thumbnailUrl) {
        const valid = await isValidImageUrl({ url: thumbnailUrl });
        if (isMounted) setIsImageValid(valid);
      } else {
        setIsImageValid(false);
      }
    }
    validate();
    return () => {
      isMounted = false;
    };
  }, [thumbnailUrl]);

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
