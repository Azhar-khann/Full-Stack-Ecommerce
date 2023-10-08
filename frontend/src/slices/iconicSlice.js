import { getIconicCollections } from "../api/serverCalls";
const { createAsyncThunk, createSlice } =  require("@reduxjs/toolkit");



export const loadIconic = createAsyncThunk(
    'products/getData',
    async () => {
        const products = await getIconicCollections();
        return products
    }
) 

export const IconicSlice = createSlice({
    name: "iconic",
    initialState: {
        products: [],
        isLoading:false,
        hasError:false
    },

    reducers: {},

    extraReducers: {

        [loadIconic.pending]: (state, action) => {
            console.log('pending')
            state.isLoading = true;
            state.hasError = false;
        },

        [loadIconic.fulfilled]: (state, action) => {
            console.log('fulfiled')           
            state.products = action.payload;
            state.isLoading = false;
            state.hasError = false;
        },

        [loadIconic.rejected]: (state, action) => {
            console.log('failed')
            state.isLoading = false;
            state.hasError = true;
        }
    }
});


export const selectdata = (state) => state.iconic.products;

export const isLoadingData = (state) => state.iconic.isLoading;
export default IconicSlice.reducer;