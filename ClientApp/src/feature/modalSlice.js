import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
    ChangeLink: false,
    SetPassWord: false,
    Share: false,
}

export const modal = createSlice({
    name: 'note',
    initialState,    reducers: {
        ChangeLink: (state) => {
           
        }
    },
})


export const noteActions = modal.actions
export default modal.reducer