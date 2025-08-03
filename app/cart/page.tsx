"use client";

import Link from "next/link";
import { useSelector } from "react-redux";

import "./cart.css";

import CartItemRow from "@/components/CartItemRow";

import { getCartItems, getTotalItems } from "@/Redux/slices/cartSlice";

import { PRIVATE_NAVIGATION } from "@/constants";

import { useCart } from "@/contexts/CartContext";

const CartPage = () => {
  const { clearCart } = useCart();

  const cart = useSelector(getCartItems);
  const totalItems = useSelector(getTotalItems);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-card rounded-lg border border-border shadow">
      <h1 className="text-3xl font-semibold mb-6 text-text">Your Cart</h1>
      {cart.items.length === 0 ? (
        <p className="text-text">
          Your cart is empty.{" "}
          <Link href={PRIVATE_NAVIGATION.PRODUCT.VIEW}>
            <span className="color-text hover:underline">Shop now</span>
          </Link>
        </p>
      ) : (
        <>
          <ul className="divide-y divide-border">
            {cart.items.map(({ productId, quantity, name, thumbnailUrl }) => {
              return (
                <CartItemRow
                  key={productId}
                  productId={productId}
                  quantity={quantity}
                  name={name}
                  thumbnailUrl={thumbnailUrl}
                />
              );
            })}
          </ul>

          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={() => clearCart()}
              className="bg-cta hover:bg-primary text-background font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-highlight clickable"
            >
              Clear Cart
            </button>
            <div className="text-text font-semibold">
              Total Items: {totalItems}
            </div>
            <Link href={PRIVATE_NAVIGATION.CHECKOUT.VIEW}>
              <span className="bg-cta hover:bg-primary text-background font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-highlight">
                Proceed to Checkout
              </span>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
