import { configureStore } from "@reduxjs/toolkit";
import bannerSliceReducer from "../slices/bannerSlice";
import homeSliceReducer from "../slices/homeSlice";
import productsSliceReducer from "../slices/productsSlice";

export default configureStore({
    reducer: {
        home: homeSliceReducer,
        banner: bannerSliceReducer,
        products: productsSliceReducer
    },
});