"use client";

// 1. React core library
import React from "react";

// 2. Types
import { OrderButtonPropsType } from "./types";

// 3. Components
import Spinner from "../Icons/Spinner";

const OrderButton = (props: OrderButtonPropsType) => {
  // 1. Props destructuring with default button type
  const { loading, onClick, type = "button" } = props;

  // 2. Return JSX for button with loading state and accessibility attributes
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      aria-busy={loading}
      aria-label={loading ? "Placing order" : "Place order"}
      className="w-full py-3 bg-cta hover:bg-primary text-background font-bold rounded transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-2 flex justify-center items-center"
    >
      {loading ? (
        <>
          <Spinner />
          Placing Order…
        </>
      ) : (
        "Place Order"
      )}
    </button>
  );
};

export default OrderButton;
