import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const makeRandomUrl = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const newUrl = result;
    return newUrl;
}



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
        const endpoint = "api/Contents"
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
    async (url) => {
        const endpoint = "api/Contents/" + url
        const response = await fetch(endpoint, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({Url :url}),
        })
        const data = response.json();
        return data;
    }
)

export const GetNote = createAsyncThunk(
    "NOTE/GET_NOTE",
    async (Url) => {
        const endpoint =  "api/Contents/" + Url;
        const response = await fetch(endpoint)
        const data = response.json();
        return data;
    }
)

const initialState = {
    CreateNote: null,
    url: makeRandomUrl(8),
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
    }
})

// Action creators are generated for each case reducer function
export const noteActions = noteSlice.actions

export default noteSlice.reducer