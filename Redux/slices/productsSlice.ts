// 1. Import Redux Toolkit utilities and RootState for typing
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// 2. Import Product type representing product structure
import { Product } from "@/app/product/types";

// 3. Define slice state interface holding products array and an optional map by ID
interface ProductsState {
  list: Product[];
  ProductById?: { [key: string]: Product };
}

// 4. Initial state with empty list and undefined ProductById map
const initialState: ProductsState = { list: [], ProductById: undefined };

// 5. Create products slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Set products list and optional ProductById map on the state
    setProducts(state, action: PayloadAction<ProductsState>) {
      state.list = action.payload.list;
      state.ProductById = action.payload?.ProductById;
    },
    // Clear products list and ProductById map
    clearProducts(state) {
      state.list = [];
      state.ProductById = undefined;
    },
  },
});

// 6. Export action creators
export const { setProducts, clearProducts } = productsSlice.actions;

// 7. Selectors to access products list and ProductById map from Redux state
export const getProducts = (state: RootState) => state.products?.list;
export const getProductByID = (state: RootState) => state.products?.ProductById;

// 8. Export reducer to include in root Redux store
export default productsSlice.reducer;
