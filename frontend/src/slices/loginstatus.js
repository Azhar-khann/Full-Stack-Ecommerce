import { checkLogin } from "../api/serverCalls";
const { createAsyncThunk, createSlice } =  require("@reduxjs/toolkit");


export const loginstatus = createAsyncThunk(
    'loggedIn/status',
    async () => {
        const logstatus = await checkLogin();
        return logstatus
    }
) 

export const loginSlice = createSlice({
    name: "register",
    initialState: {
        user: {},
        isLoading:false,
        hasError:false
    },

    reducers: {},

    extraReducers: {

        [loginstatus.pending]: (state, action) => {
            console.log('pending')
            state.isLoading = true;
            state.hasError = false;
        },

        [loginstatus.fulfilled]: (state, action) => {
            console.log('fulfiled')        
            state.user = action.payload;
            state.isLoading = false;
            state.hasError = false;
        },

        [loginstatus.rejected]: (state, action) => {
            console.log('failed')
            state.isLoading = false;
            state.hasError = true;
        }
    }
});


export const selectstatus = (state) => state.loginstatus.user;

export const isLoadingData = (state) => state.loginstatus.isLoading;
export default loginSlice.reducer;
