"use client";

// 1. React related libraries imports
import Link from "next/link";
import { useSelector } from "react-redux";

// 2. Styles imports
import "./cart.css";

// 3. Component imports
import CartItemRow from "@/components/CartItemRow";

// 4. Redux selectors
import { getCartItems, getTotalItems } from "@/Redux/slices/cartSlice";

// 5. Constants/config imports
import { PRIVATE_NAVIGATION } from "@/constants";

// 6. Context imports
import { useCart } from "@/contexts/CartContext";

const CartPage = () => {
  // 2. Variables / state - using context and redux selectors
  const { clearCart } = useCart();

  const cart = useSelector(getCartItems);
  const totalItems = useSelector(getTotalItems);

  // 3. No useEffect hooks are needed here

  // 4. No internal functions besides inline handlers

  // 5. Return JSX structure
  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-card rounded-lg border border-border shadow">
      <h1 className="text-3xl font-semibold mb-6 text-text">Your Cart</h1>

      {/* If cart is empty, show message and link to shopping */}
      {cart.items.length === 0 ? (
        <p className="text-text">
          Your cart is empty.{" "}
          <Link href={PRIVATE_NAVIGATION.PRODUCT.VIEW}>
            <span className="color-text hover:underline">Shop now</span>
          </Link>
        </p>
      ) : (
        <>
          {/* List of cart items */}
          <ul className="divide-y divide-border">
            {cart.items.map(({ productId, quantity, name, thumbnailUrl }) => (
              <CartItemRow
                key={productId}
                productId={productId}
                quantity={quantity}
                name={name}
                thumbnailUrl={thumbnailUrl}
              />
            ))}
          </ul>

          {/* Action buttons and totals */}
          <div className="mt-6 flex justify-between items-center">
            {/* Clears all items from cart */}
            <button
              onClick={() => clearCart()}
              className="bg-cta hover:bg-primary text-background font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-highlight clickable"
            >
              Clear Cart
            </button>

            {/* Total count of items in cart */}
            <div className="text-text font-semibold">
              Total Items: {totalItems}
            </div>

            {/* Link to checkout page */}
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
