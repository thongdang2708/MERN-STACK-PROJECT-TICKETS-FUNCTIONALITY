import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from "../features/auth/AuthSlice";
import TicketReducer from "../features/ticket/TicketSlice";
import NoteReducer from "../features/note/NoteSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    ticket: TicketReducer,
    note: NoteReducer
  },
});
