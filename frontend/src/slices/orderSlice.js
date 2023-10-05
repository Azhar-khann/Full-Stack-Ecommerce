import { getUserOrders} from "../api/serverCalls";
const { createAsyncThunk, createSlice } =  require("@reduxjs/toolkit");


export const loadorders = createAsyncThunk(
    'orders/getorders',
    async () => {
        const orders = await getUserOrders();
        return orders
    }
) 

export const ordersSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        isLoading:false,
        hasError:false
    },

    reducers: {},

    extraReducers: {

        [loadorders.pending]: (state, action) => {
            console.log('pending')
            state.isLoading = true;
            state.hasError = false;
        },

        [loadorders.fulfilled]: (state, action) => {
            console.log('fulfiled')           
            state.orders = action.payload;
            state.isLoading = false;
            state.hasError = false;
        },

        [loadorders.rejected]: (state, action) => {
            console.log('failed')
            state.isLoading = false;
            state.hasError = true;
        }
    }
});


export const selectdata = (state) => state.orders.orders;

export const isLoadingData = (state) => state.orders.isLoading;
export default ordersSlice.reducer;