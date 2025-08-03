"use client";

// 1. React core library
import React from "react";

// 2. Styles
import "./cartStatus.css";

// 3. Contexts
import { useCart } from "@/contexts/CartContext";

const CartStatus = () => {
  // 2. Variables / State - get total items count from cart context
  const { totalItems } = useCart();

  // 3. No useEffect or functions needed

  // 4. Return JSX displaying cart label and total items badge
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
