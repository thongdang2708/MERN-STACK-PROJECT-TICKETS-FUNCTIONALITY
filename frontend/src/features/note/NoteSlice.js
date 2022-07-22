

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import NoteService from "./NoteService";

const initialState = {
    notes: [],
    item: {
        item: {},
        edit: true
    },
    isError: false,
    isSuccess: false,
    isNoteLoading: false,
    message: ""
};

export const displayNotes = createAsyncThunk("/note/displayNote",
    async (user, thunkAPI) => {
        try {

            let token = thunkAPI.getState().auth.user.token;

            return await NoteService.showNotes(user, token);

        } catch (error) {
            let message = (error.response && error.response.data && error.response.data.message) || error.messsage || error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const createMoreNote = createAsyncThunk("/note/createNote",
        async (user, thunkAPI) => {
            try {

                let token = thunkAPI.getState().auth.user.token;

                return await NoteService.addNotes(user.text, user.ticketId, token);

            } catch (error) {
                let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                return thunkAPI.rejectWithValue(message);
            }
        }
)

export const addEditItem = createAsyncThunk("/note/addEditItem",
        async (user, thunkAPI) => {
            return {
                item: user,
                edit: true
            }
        }
);

export const editForNote = createAsyncThunk("/note/editNote",
        async (user, thunkAPI) => {
            try {
                let token = thunkAPI.getState().auth.user.token;

                return await NoteService.editNote(user.text, user.noteId, token);
            } catch (error) {
                let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                return thunkAPI.rejectWithValue(message);
            }
        }
);

export const deleteForNote = createAsyncThunk("/note/deleteNote",
        async (user, thunkAPI) => {
            try {

                let token = thunkAPI.getState().auth.user.token;

                return await NoteService.deleteNote(user, token)
            } catch (error) {
                let message = (error.response && error.response.data && error.response.data.messsage) || error.message || error.toString();

                return thunkAPI.rejectWithValue(message);
            }
        }
)


export const NoteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        resetForNote: (state) => initialState,
        resetForItem: (state) => {
            state.item = {
                item: {},
                edit: false
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(displayNotes.pending, (state, action) => {
                state.isNoteLoading = true
            })
            .addCase(displayNotes.fulfilled, (state, action) => {
                state.isNoteLoading = false;
                state.isSuccess = true;
                state.notes = action.payload;
            })
            .addCase(displayNotes.rejected, (state, action) => {
                state.isError = true;
                state.isNoteLoading = false;
                state.message = action.payload;
            })
            .addCase(createMoreNote.pending, (state, action) => {
                state.isNoteLoading = false;
            })
            .addCase(createMoreNote.fulfilled, (state, action) => {
                state.isNoteLoading = false;
                state.isSuccess = true;
                state.notes = [action.payload,...state.notes]
            })
            .addCase(createMoreNote.rejected, (state, action) => {
                state.isNoteLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(addEditItem.fulfilled, (state, action) => {
                state.item = action.payload;
            })
            .addCase(editForNote.pending, (state, action) => {
                state.isNoteLoading = true;
            })
            .addCase(editForNote.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isNoteLoading = false;
                state.notes = state.notes.map((note) => note._id === action.payload._id ? {...note, ...action.payload} : note)
            })
            .addCase(editForNote.rejected, (state, action) => {
                state.isError = true;
                state.isNoteLoading = false;
                state.message = action.payload;
            })
            .addCase(deleteForNote.pending, (state, action) => {
                state.isNoteLoading = true;
            })
            .addCase(deleteForNote.fulfilled, (state, action) => {
                state.isNoteLoading = false;
                state.isSuccess = true;
                state.notes = state.notes.filter((note) => note._id !== action.payload._id);
            })
            .addCase(deleteForNote.rejected, (state, action) => {
                state.isError = true
                state.isNoteLoading = false;
                state.message = action.payload;
            })
    }
    
});


export const {resetForNote, resetForItem} = NoteSlice.actions

export default NoteSlice.reducer


