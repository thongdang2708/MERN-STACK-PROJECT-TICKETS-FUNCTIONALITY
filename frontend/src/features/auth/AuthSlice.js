
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { AuthService } from "./AuthService";

let user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};


//Register
export const register = createAsyncThunk("/auth/register", 
        async (user, thunkAPI) => {
        
        try {

            return await AuthService.register(user);

        } catch (error) {
            let message = error.response && error.response.data && error.response.data.message || error.message || error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);




//Login 

export const login = createAsyncThunk("/auth/login",
        async (user, thunkAPI) => {
            try {
                
                return await AuthService.login(user);

            } catch (error) {
                let message = error.response && error.response.data && error.response.data.message || error.message || error.toString();

                return thunkAPI.rejectWithValue(message);
            }
        }
);

//Logout

export const logoutFunction = createAsyncThunk("/auth/logout", 
        async (user, thunkAPI) => {
            await AuthService.logout();
        }
)


export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetFunction: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
            state.user = "";
        },
        resetForLogin: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading =  true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isSuccess = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(logoutFunction.fulfilled, (state, action) => {
                state.user = null;
            });
    }
});

export const {resetFunction, resetForLogin} = AuthSlice.actions;


export default AuthSlice.reducer;