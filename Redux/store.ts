// 1. Import Redux Toolkit's configureStore to create the Redux store
import { configureStore } from "@reduxjs/toolkit";

// 2. Import individual slice reducers
import userReducer from "./slices/userSlice";
import productsReducer from "./slices/productsSlice";
import productDetailReducer from "./slices/productDetailSlice";
import cartReducer from "./slices/cartSlice";

// 3. Create and export the Redux store configured with combined reducers
export const store = configureStore({
  reducer: {
    user: userReducer, // Handles user state (authentication, profile)
    products: productsReducer, // Manages products list state
    productDetail: productDetailReducer, // Manages selected product detail state
    cart: cartReducer, // Manages shopping cart state
  },
});

// 4. Type for the store's root state (inferred from store.getState)
export type RootState = ReturnType<typeof store.getState>;

// 5. Type for the dispatch function from this store
export type AppDispatch = typeof store.dispatch;
