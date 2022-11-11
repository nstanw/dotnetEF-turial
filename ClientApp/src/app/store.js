import { configureStore } from "@reduxjs/toolkit";
import NoteReducer from '../feature/NoteSlice'

export const store = configureStore({
    reducer: {
        note: NoteReducer,
    }
})