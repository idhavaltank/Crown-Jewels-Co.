"use client";

import React from "react";
import "./cartStatus.css";

import { useCart } from "@/contexts/CartContext";

const CartStatus = () => {
  const { totalItems } = useCart();

  return (
    <div className="relative">
      <span className="inline-block mr-2">Cart</span>
      <span className="bg-primary text-background rounded-full px-2 py-1 text-xs font-bold">
        {totalItems}
      </span>
    </div>
  );
};

export default CartStatus;
