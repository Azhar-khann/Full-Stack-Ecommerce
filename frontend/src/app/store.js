import { configureStore } from "@reduxjs/toolkit";
import bannerSliceReducer from "../slices/bannerSlice";
import homeSliceReducer from "../slices/homeSlice";

export default configureStore({
    reducer: {
        home: homeSliceReducer,
        banner: bannerSliceReducer,
    },
});