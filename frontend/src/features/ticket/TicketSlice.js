
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import TicketService from "./TicketService";

const initialState = {
    tickets: [],
    ticket: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: false,
};

export const createTicketFunction = createAsyncThunk("/ticket/create",
    async (user, thunkAPI) => {
        try {
            let token = thunkAPI.getState().auth.user.token;

            return await TicketService.createTicket(user, token);


        } catch (error) {
            let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const displayTickets = createAsyncThunk("/ticket/getTickets", 
        async (user, thunkAPI) => {
            try {
                let token = thunkAPI.getState().auth.user.token;

                return await TicketService.getTickets(token);
            } catch (error) {
                let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                return thunkAPI.rejectWithValue(message);
            }
        }
);



export const displaySingleTicket = createAsyncThunk("/ticket/getSingleTicket", 
        async (user, thunkAPI) => {
        
        try {
            
            let token = thunkAPI.getState().auth.user.token;
            return await TicketService.getSingleTicket(user, token);

        } catch (error) {
            let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateSingleTicket = createAsyncThunk("/ticket/updateTicket", 
        async (user, thunkAPI) => {

            try {

                let token = thunkAPI.getState().auth.user.token;

                return await TicketService.updateTicket(user, token);
            } catch (error) {

                let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                return thunkAPI.rejectWithValue(message);
            }
        }
);

export const TicketSlice = createSlice({
    name: "ticket",
    initialState,
    reducers: {
        resetFunctionForTicket: (state) => initialState
    },
    extraReducers: (builder) => {
            builder
                .addCase(createTicketFunction.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(createTicketFunction.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                })
                .addCase(createTicketFunction.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                })
                .addCase(displayTickets.pending, (state, action) => {
                    state.isLoading = true;
                })
                .addCase(displayTickets.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.tickets = action.payload
                })
                .addCase(displayTickets.rejected, (state, action) => {
                    state.isError = true;
                    state.isLoading = false;
                    state.message = action.payload;
                })
                .addCase(displaySingleTicket.pending, (state, action) => {
                    state.isLoading = true;
                })
                .addCase(displaySingleTicket.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.ticket = action.payload;
                })
                .addCase(displaySingleTicket.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                })
                .addCase(updateSingleTicket.pending, (state, action) => {
                    state.isLoading = true;
                })
                .addCase(updateSingleTicket.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.tickets = state.tickets.map((ticket) => ticket._id === action.payload._id ? {...ticket, ...action.payload} : ticket);
                })
                .addCase(updateSingleTicket.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                })
    }
});

export const {resetFunctionForTicket} = TicketSlice.actions;
export default TicketSlice.reducer;













