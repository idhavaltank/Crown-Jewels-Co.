import { Product } from "@/app/product/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ProductDetailState {
  product?: Product;
}

const initialState: ProductDetailState = {
  product: undefined,
};

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    setProduct(state, action: PayloadAction<Product>) {
      state.product = action.payload;
    },
    clearProduct(state) {
      state.product = undefined;
    },
  },
});

export const { setProduct, clearProduct } = productDetailSlice.actions;

// Selector function to get user info from Redux state
export const getProducts = (state: RootState) => state?.productDetail?.product;

export default productDetailSlice.reducer;
