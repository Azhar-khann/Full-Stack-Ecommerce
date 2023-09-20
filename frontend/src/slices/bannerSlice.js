import { getbannerProduct } from "../api/serverCalls";
const { createAsyncThunk, createSlice } =  require("@reduxjs/toolkit");


export const loadbannerProduct = createAsyncThunk(
    'home/getData',
    async (type) => {
        const product = await getbannerProduct();
        return product
    }
) 

export const bannerSlice = createSlice({
    name: "banner",
    initialState: {
        bannerProduct: [],
        isLoading:false,
        hasError:false
    },

    reducers: {},

    extraReducers: {

        [loadbannerProduct.pending]: (state, action) => {
            console.log('pending')
            state.isLoading = true;
            state.hasError = false;
        },

        [loadbannerProduct.fulfilled]: (state, action) => {
            console.log('fulfiled')           
            state.bannerProduct = action.payload;
            state.isLoading = false;
            state.hasError = false;
        },

        [loadbannerProduct.rejected]: (state, action) => {
            console.log('failed')
            state.isLoading = false;
            state.hasError = true;
        }
    }
});


export const selectdata = (state) => state.home.bannerProduct;

export const isLoadingData = (state) => state.home.isLoading;
export default bannerSlice.reducer;
