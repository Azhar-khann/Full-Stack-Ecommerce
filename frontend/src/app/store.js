import { configureStore } from "@reduxjs/toolkit";
import bannerSliceReducer from "../slices/bannerSlice";


export default configureStore({
    reducer: {
      home: bannerSliceReducer,
    },
});