"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  addToCart as addToCartAction,
  clearCart as clearCartAction,
} from "@/Redux/slices/cartSlice";
import {
  addItemPropsType,
  CartContextType,
  CartItem,
  updateItemQuantityPropsType,
} from "./types/cartContext.types";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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

  const updateStorage = ({ items }: { items: CartItem[] | [] }) => {
    setCartItems(items);
    dispatch(clearCartAction());
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
    if (items?.length) {
      localStorage.setItem("cart", JSON.stringify(items));
    } else {
      localStorage.removeItem("cart");
    }
  };

  const clearCart = () => {
    updateStorage({ items: [] });
  };

  const removeItem = (productId: string) => {
    const updatedItems = cartItems.filter(
      (item) => item.productId !== productId
    );
    updateStorage({ items: updatedItems });
  };

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

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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

// Hook to use cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
