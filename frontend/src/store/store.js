import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../features/productsApi";
import productsReducer from "../features/productsSlice";
import cartReducer from "../features/cartSlice";

export default configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
