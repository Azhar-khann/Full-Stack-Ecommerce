import { configureStore } from "@reduxjs/toolkit";
import bannerSliceReducer from "../slices/bannerSlice";
import homeSliceReducer from "../slices/homeSlice";
import productsSliceReducer from "../slices/productsSlice";
import productDetailsSliceReducer from "../slices/productDetailsSlice";
import loginStatusSliceReducer  from "../slices/loginstatus";
import cartSliceReducer from "../slices/cartSlice";
import orderSliceReducer from "../slices/orderSlice";

export default configureStore({
    reducer: {
        home: homeSliceReducer,
        banner: bannerSliceReducer,
        products: productsSliceReducer,
        productDetails: productDetailsSliceReducer,
        loginstatus: loginStatusSliceReducer,
        cart: cartSliceReducer,
        orders: orderSliceReducer
    },
});