// 1. Import Redux Toolkit utilities and RootState for typing
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// 2. Import Product type representing product detail structure
import { Product } from "@/app/product/types";

// 3. Define slice state interface with optional product field
interface ProductDetailState {
  product?: Product;
}

// 4. Initial state with undefined product initially
const initialState: ProductDetailState = {
  product: undefined,
};

// 5. Create productDetail slice
const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    // Set the product data in the state
    setProduct(state, action: PayloadAction<Product>) {
      state.product = action.payload;
    },
    // Clear the product detail from the state
    clearProduct(state) {
      state.product = undefined;
    },
  },
});

// 6. Export action creators
export const { setProduct, clearProduct } = productDetailSlice.actions;

// 7. Selector to get the current product detail from the Redux state
export const getProducts = (state: RootState) => state.productDetail.product;

// 8. Export the reducer to integrate with the Redux store
export default productDetailSlice.reducer;
