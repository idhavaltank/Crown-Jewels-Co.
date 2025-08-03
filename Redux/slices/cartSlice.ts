// 1. Import Redux Toolkit utilities and RootState for typing
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// 2. Define the CartItem interface representing a single cart item
interface CartItem {
  productId: string;
  quantity: number;
  name: string;
  thumbnailUrl?: string;
}

// 3. Define the CartState interface representing the slice state
interface CartState {
  items: CartItem[];
}

// 4. Initial state for the cart slice
const initialState: CartState = {
  items: [],
};

// 5. Create the cart slice using createSlice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart or update quantity if already present
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
        item.quantity += quantity; // increment existing quantity
      } else {
        // add new item to cart
        state.items.push({ productId, quantity, name, thumbnailUrl });
      }
    },
    // Remove item from cart by productId
    removeFromCart(state, action: PayloadAction<{ productId: string }>) {
      state.items = state.items.filter(
        (i) => i.productId !== action.payload.productId
      );
    },
    // Update quantity for a specific product in the cart
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
    // Clear all items from the cart
    clearCart(state) {
      state.items = [];
    },
  },
});

// 6. Export action creators for usage in components or thunks
export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

// 7. Selectors to access cart state from the Redux store

// Select the entire cart slice (including array of items)
export const getCartItems = (state: RootState) => state.cart;

// Select the total number of items in the cart (sum of quantities)
export const getTotalItems = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

// 8. Export reducer to be integrated into the root Redux store
export default cartSlice.reducer;
