import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchGet, PREFIX } from '../util/fetchData';

export const CreateNote = createAsyncThunk(
    "NOTE/POST_CREATE_NOTE",
    async (content) => {
        const endpoint = "api/Contents"
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(content),
        })
        const data = response.json();
        return data;
    }
)

export const UpdateNote = createAsyncThunk(
    "NOTE/PUT_UPDATE_NOTE",
    async (content) => {
        const endpoint = "api/Contents/";
        const response = await fetch(endpoint, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(content),
        })
        const data = response.json();
        return data;
    }
)

export const ThunkChangeUrl = createAsyncThunk(
    "NOTE/PATCH_UPDATE_NOTE",
    async (dataUrl) => {
        const endpoint = "api/Contents/" + dataUrl.oldUrl;
        const response = await fetch(endpoint, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Url: dataUrl.newUrl })
        })
        const data = response.json();
        return data;
    }
)

export const GetNote = createAsyncThunk(
    "NOTE/GET_NOTE",
    async (Url) => {
        const endpoint = "api/Contents/" + Url;
        const response = await fetch(endpoint)
        const data = response.json();
        return data;
    }
)

export const checkURL = createAsyncThunk(
    'NOTE/GET_CHECK_URL', async () => {
        const endpoint = PREFIX;
        const response = await fetch(endpoint)
        const data = response.json();
        return data;
    }
)
const initialState = {
    checkURL: null,
    GetNote: null,
    CreateNote: null,
   
}

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        storeUrl: (state, action) => {

            state.url = action.payload;
        }
    },
    extraReducers: {
        [CreateNote.fulfilled]: (state, action) => {
            state.CreateNote = action.payload;
        },
        [CreateNote.rejected]: (state, action) => {
            state.CreateNote = action.payload;
        },
        [GetNote.fulfilled]: (state, action) => {
            state.GetNote = action.payload;
        },
        [GetNote.rejected]: (state, action) => {
            state.GetNote = action.payload;
        },
        [checkURL.fulfilled]: (state, action) => {
            state.checkURL = action.payload;
        },
        [checkURL.rejected]: (state, action) => {
            state.checkURL = action.payload;
        },
    }
})

// Action creators are generated for each case reducer function
export const noteActions = noteSlice.actions
export default noteSlice.reducer