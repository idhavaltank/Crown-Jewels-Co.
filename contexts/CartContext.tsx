"use client";

// 1. React core libraries
import React, { createContext, useContext, useEffect, useState } from "react";

// 2. Redux hooks and actions
import { useDispatch } from "react-redux";
import {
  addToCart as addToCartAction,
  clearCart as clearCartAction,
} from "@/Redux/slices/cartSlice";

// 3. Types for Cart context and props
import {
  addItemPropsType,
  CartContextType,
  CartItem,
  updateItemQuantityPropsType,
} from "./types/cartContext.types";

// 4. Create context with undefined default to enforce usage within provider
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  // 2. Local state to hold cart items array
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // 3. Load cart from localStorage on mount and sync state + Redux + storage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const items: CartItem[] = JSON.parse(savedCart);
        updateStorage({ items: items });
      } catch (e) {
        console.error("Error parsing saved cart from localStorage", e);
        localStorage.removeItem("cart");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 4. Add item to cart (if exists, increment quantity, else add new)
  const addItem = (addItemProps: addItemPropsType) => {
    const {
      name = "",
      productId,
      quantity = 1,
      thumbnailUrl = "",
    } = addItemProps;

    const existingItem = cartItems.find((item) => item.productId === productId);

    let updatedItems: CartItem[];

    if (existingItem) {
      updatedItems = cartItems.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedItems = [
        ...cartItems,
        { productId, quantity, name, thumbnailUrl },
      ];
    }

    updateStorage({ items: updatedItems });
  };

  // 5. Sync local state, Redux store, and localStorage
  const updateStorage = ({ items }: { items: CartItem[] | [] }) => {
    setCartItems(items);

    // Clear Redux cart slice before re-adding updated items
    dispatch(clearCartAction());

    // Add each item to Redux slice
    items?.forEach((item) =>
      dispatch(
        addToCartAction({
          productId: item.productId,
          quantity: item.quantity,
          name: item.name,
          thumbnailUrl: item.thumbnailUrl,
        })
      )
    );

    // Persist cart to localStorage or clear if empty
    if (items?.length) {
      localStorage.setItem("cart", JSON.stringify(items));
    } else {
      localStorage.removeItem("cart");
    }
  };

  // 6. Clear entire cart
  const clearCart = () => {
    updateStorage({ items: [] });
  };

  // 7. Remove a single item by productId
  const removeItem = (productId: string) => {
    const updatedItems = cartItems.filter(
      (item) => item.productId !== productId
    );
    updateStorage({ items: updatedItems });
  };

  // 8. Update item quantity; remove item if quantity <= 0
  const updateItemQuantity = ({
    productId,
    quantity,
  }: updateItemQuantityPropsType) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    const updatedItems = cartItems.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );

    updateStorage({ items: updatedItems });
  };

  // 9. Calculate total number of items in cart
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // 10. Provide cart context value to children
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        updateItemQuantity,
        clearCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 11. Custom hook to consume CartContext safely (throws error if outside provider)
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
