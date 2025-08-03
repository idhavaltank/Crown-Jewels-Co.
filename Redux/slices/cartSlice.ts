import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CartItem {
  productId: string;
  quantity: number;
  name: string;
  thumbnailUrl?: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<{
        productId: string;
        quantity?: number;
        name: string;
        thumbnailUrl?: string;
      }>
    ) {
      const { productId, quantity = 1, name, thumbnailUrl } = action.payload;
      const item = state.items.find((i) => i.productId === productId);
      if (item) {
        item.quantity += quantity;
      } else {
        state.items.push({ productId, quantity, name, thumbnailUrl });
      }
    },
    removeFromCart(state, action: PayloadAction<{ productId: string }>) {
      state.items = state.items.filter(
        (i) => i.productId !== action.payload.productId
      );
    },
    updateQuantity(
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) {
      const item = state.items.find(
        (i) => i.productId === action.payload.productId
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export const getCartItems = (state: RootState) => state.cart;

export const getTotalItems = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export default cartSlice.reducer;
