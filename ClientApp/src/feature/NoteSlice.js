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
        const endpoint = PREFIX + Url;
        const response = await fetch(endpoint)
        if (response.status === 404) {
            return {
                url: Url,
                note: null,
                password: null,
                setPassword: false
            };
        }
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
    note: {
        url: null,
        note: null,
        password: null,
        setPassword: false
    },
    UpdateNote: null,
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
        },
        setNote: (state, action) => {
            state.note = action.payload;
        },
    },
    extraReducers: {
        [CreateNote.fulfilled]: (state, action) => {
            state.CreateNote = action.payload;
        },
        [CreateNote.rejected]: (state, action) => {
            state.CreateNote = action.error;
        },

        [GetNote.fulfilled]: (state, action) => {
            state.GetNote = action.payload;
            state.note = action.payload;
        },
        [GetNote.rejected]: (state, action) => {
            state.GetNote = action.error;
        },

        [checkURL.fulfilled]: (state, action) => {
            state.note.url = action.payload.url;
            state.checkURL = action.payload;
            state.GetNote = action.payload;
        },
        [checkURL.rejected]: (state, action) => {
            state.checkURL = action.payload;
        },

        [UpdateNote.fulfilled]: (state, action) => {
            state.UpdateNote = action.payload;
            state.note = action.payload;
        },
        [UpdateNote.rejected]: (state, action) => {
            state.UpdateNote = action.error;
        },
    }
})

// Action creators are generated for each case reducer function
export const noteActions = noteSlice.actions
export default noteSlice.reducer