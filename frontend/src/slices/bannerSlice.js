import { getProductbyId } from "../api/serverCalls";
const { createAsyncThunk, createSlice } =  require("@reduxjs/toolkit");


export const loadbannerProduct = createAsyncThunk(
    'banner/getData',
    async (id) => {
        const product = await getProductbyId(id);
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


export const selectdata = (state) => state.banner.bannerProduct;

export const isLoadingData = (state) => state.banner.isLoading;
export default bannerSlice.reducer;
