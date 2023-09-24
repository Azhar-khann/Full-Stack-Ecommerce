import { configureStore } from "@reduxjs/toolkit";
import bannerSliceReducer from "../slices/bannerSlice";
import homeSliceReducer from "../slices/homeSlice";
import productsSliceReducer from "../slices/productsSlice";
import productDetailsSliceReducer from "../slices/productDetailsSlice";

export default configureStore({
    reducer: {
        home: homeSliceReducer,
        banner: bannerSliceReducer,
        products: productsSliceReducer,
        productDetails: productDetailsSliceReducer,
    },
});