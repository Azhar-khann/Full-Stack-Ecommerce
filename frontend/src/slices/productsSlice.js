import { getFilterProducts } from "../api/serverCalls";
const { createAsyncThunk, createSlice } =  require("@reduxjs/toolkit");



export const loadProducts = createAsyncThunk(
    'products/getData',
    async ({filter,name}) => {
        const products = await getFilterProducts(filter,name);
        return products
    }
) 

export const ProductsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        isLoading:false,
        hasError:false
    },

    reducers: {},

    extraReducers: {

        [loadProducts.pending]: (state, action) => {
            console.log('pending')
            state.isLoading = true;
            state.hasError = false;
        },

        [loadProducts.fulfilled]: (state, action) => {
            console.log('fulfiled')           
            state.products = action.payload;
            state.isLoading = false;
            state.hasError = false;
        },

        [loadProducts.rejected]: (state, action) => {
            console.log('failed')
            state.isLoading = false;
            state.hasError = true;
        }
    }
});


export const selectdata = (state) => state.products.products;

export const isLoadingData = (state) => state.products.isLoading;
export default ProductsSlice.reducer;