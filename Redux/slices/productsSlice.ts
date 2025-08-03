import { Product } from "@/app/product/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ProductsState {
  list: Product[];
  ProductById?: { [key: string]: Product };
}

const initialState: ProductsState = { list: [], ProductById: undefined };

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<ProductsState>) {
      state.list = action.payload.list;
      state.ProductById = action.payload?.ProductById;
    },
    clearProducts(state) {
      state.list = [];
      state.ProductById = undefined;
    },
  },
});

export const { setProducts } = productsSlice.actions;

export const getProducts = (state: RootState) => state?.products?.list;
export const getProductByID = (state: RootState) =>
  state?.products?.ProductById;

export default productsSlice.reducer;
