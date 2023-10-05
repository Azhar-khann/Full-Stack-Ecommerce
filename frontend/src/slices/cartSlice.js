import { getUserCart} from "../api/serverCalls";
const { createAsyncThunk, createSlice } =  require("@reduxjs/toolkit");


export const loadcart = createAsyncThunk(
    'cart/getcart',
    async () => {
        const cart = await getUserCart();
        return cart
    }
) 

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        isLoading:false,
        hasError:false
    },

    reducers: {},

    extraReducers: {

        [loadcart.pending]: (state, action) => {
            console.log('pending')
            state.isLoading = true;
            state.hasError = false;
        },

        [loadcart.fulfilled]: (state, action) => {
            console.log('fulfiled')           
            state.cartItems = action.payload;
            console.log('state=',state.cartItems)
            state.isLoading = false;
            state.hasError = false;
        },

        [loadcart.rejected]: (state, action) => {
            console.log('failed')
            state.cartItems = [];
            state.isLoading = false;
            state.hasError = true;
        }
    }
});


export const selectdata = (state) => state.cart.cartItems;

export const isLoadingData = (state) => state.cart.isLoading;
export default cartSlice.reducer;
