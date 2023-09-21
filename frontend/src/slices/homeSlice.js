import { getFeaturedProducts } from "../api/serverCalls";
const { createAsyncThunk, createSlice } =  require("@reduxjs/toolkit");


export const loadHomeProducts = createAsyncThunk(
    'home/getData',
    async (type) => {
        const products = await getFeaturedProducts();
        return products
    }
) 

export const HomeSlice = createSlice({
    name: "home",
    initialState: {
        products: [],
        gender: [],
        everydaySneakers: [],
        forRunners : [],
        isLoading:false,
        hasError:false
    },

    reducers: {},

    extraReducers: {

        [loadHomeProducts.pending]: (state, action) => {
            console.log('pending')
            state.isLoading = true;
            state.hasError = false;
        },

        [loadHomeProducts.fulfilled]: (state, action) => {
            console.log('fulfiled')           
            state.products = action.payload.featuredProducts;
            state.gender =  action.payload.gender;
            state.everydaySneakers = action.payload.everydaySneakersProducts;
            state.forRunners = action.payload.forRunnersProducts
        
            state.isLoading = false;
            state.hasError = false;
        },

        [loadHomeProducts.rejected]: (state, action) => {
            console.log('failed')
            state.isLoading = false;
            state.hasError = true;
        }
    }
});


export const selectfeatured = (state) => state.home.products;
export const selectgender = (state) => state.home.gender;
export const selecteverydaySneakers = (state) => state.home.everydaySneakers;
export const selectforRunners = (state) => state.home.forRunners;

export const isLoadingData = (state) => state.home.isLoading;
export default HomeSlice.reducer;