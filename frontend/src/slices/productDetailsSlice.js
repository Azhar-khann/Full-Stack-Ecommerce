import { getProductbyId } from "../api/serverCalls";
const { createAsyncThunk, createSlice } =  require("@reduxjs/toolkit");


export const loadProduct = createAsyncThunk(
    'banner/getData',
    async (id) => {
        const product = await getProductbyId(id);
        return product
    }
) 

export const ProductDetailsSlice = createSlice({
    name: "productDetails",
    initialState: {
        productDetails: [],
        isLoading:false,
        hasError:false
    },

    reducers: {},

    extraReducers: {

        [loadProduct.pending]: (state, action) => {
            console.log('pending')
            state.isLoading = true;
            state.hasError = false;
        },

        [loadProduct.fulfilled]: (state, action) => {
            console.log('fulfiled')           
            state.productDetails = action.payload;
            state.isLoading = false;
            state.hasError = false;
        },

        [loadProduct.rejected]: (state, action) => {
            console.log('failed')
            state.isLoading = false;
            state.hasError = true;
        }
    }
});


export const selectdata = (state) => state.productDetails.productDetails;

export const isLoadingData = (state) => state.productDetails.isLoading;
export default ProductDetailsSlice.reducer;
