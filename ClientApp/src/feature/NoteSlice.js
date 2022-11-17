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
        const endpoint = "api/Notes/update";
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

export const UpdateUrl = createAsyncThunk(
    "NOTE/PUT_UPDATE_URL",
    async (content) => {
        const endpoint = "api/Notes/UpdateUrl";
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

export const UpdatePassword = createAsyncThunk(
    "NOTE/PUT_UPDATE_PASSWORD",
    async (content) => {
        const endpoint = "api/Notes/UpdatePassword";
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

export const resetPassword = createAsyncThunk(
    "NOTE/PATCH_reset-password",
    async (content) => {
        const endpoint = "api/Notes/" + 'reset-password';
        const response = await fetch(endpoint, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(content)
        })
        const data = response.json();
        return data;
    }
)

export const loginNote = createAsyncThunk(
    "NOTE/PATCH_Login_NOTE",
    async (urlAndPass) => {
        const endpoint = "api/Notes/" + "login";
        const response = await fetch(endpoint, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(urlAndPass)
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
                setPassword: false,
                newUrl: null,
            };
        }
        const data = response.json();
        return data;
    }
)

export const checkURL = createAsyncThunk(
    'NOTE/GET_CHECK_URL', async () => {
        const endpoint = PREFIX + "newPath" ;
        const response = await fetch(endpoint)
        const data = response.json();
        return data;
    }
)
const initialState = {
    err:null,
    note: {
        url: null,
        note: null,
        password: null,
        setPassword: false,
        newUrl: null,
    },
    loginNote: null,
    UpdateNote: null,
    checkURL: null,
    GetNote: null,
    CreateNote: null,
    editNote: false,
    loginNote: null,
    Updateurl: null,

}

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {

        editNoteOn: (state) => {
            state.editNote = true;
        },
        editNoteOff: (state) => {
            state.editNote = false;
        },
        storeurl: (state, action) => {
            state.url = action.payload;
        },
        setNote: (state, action) => {
            state.note = action.payload;
        },
    },
    extraReducers: {
        [CreateNote.fulfilled]: (state, action) => {
            state.CreateNote = action.payload;
            state.note = action.payload;
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
            state.err = action.error;
        },

        [UpdateNote.fulfilled]: (state, action) => {
            state.UpdateNote = action.payload;
            state.note = action.payload;
        },
        [UpdateNote.rejected]: (state, action) => {
            state.err = action.error;
        },

        [UpdateUrl.fulfilled]: (state, action) => {
            state.UpdateUrl = action.payload;
            state.note = action.payload;
        },
        [UpdateUrl.rejected]: (state, action) => {
            state.err = action.error;
        },
       
        [loginNote.fulfilled]: (state, action) => {
            state.loginNote = action.payload;
            state.note = action.payload;
        },
        [loginNote.rejected]: (state, action) => {
            state.loginNote = action.error;
            state.err = action.error;
        },
       
        [resetPassword.fulfilled]: (state, action) => {
            state.resetPassword = action.payload;
        },
        [resetPassword.rejected]: (state, action) => {
            state.err = action.error;
        },
    }
})

// Action creators are generated for each case reducer function
export const noteActions = noteSlice.actions
export default noteSlice.reducer