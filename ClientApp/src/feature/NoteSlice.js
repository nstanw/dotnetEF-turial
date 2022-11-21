import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchGet, getAPI, patchAPI, PREFIX } from '../util/fetchData';


const pathname = window.location.pathname.split('/')[1];

export const UpdateNote = createAsyncThunk(
    "NOTE/PUT_UPDATE_NOTE",
    async (content) => {
        const endpoint = "api/Notes/" + content.url;
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
    "NOTE/PATCH_UPDATE_URL",
    async (content) => {
        const endpoint = "api/Notes/" + content.url + "/url";
        const data = patchAPI(endpoint, content)
        return data;
    }
)
//#region PATCH PASSWORD
export const UpdatePassword = createAsyncThunk(
    "NOTE/PATCH_UPDATE_PASSWORD",
    async (content) => {
        const endpoint = "api/Notes/" + content.url + "/password";
        const data = patchAPI(endpoint, content)
        return data;
    }
)

export const checkPassword = createAsyncThunk(
    "NOTE/PATCH_CHECK_PASSWORD",
    async (content) => {
        const endpoint = "api/Notes/" + content.url + "/check-password";
        const data = patchAPI(endpoint, content)
        return data;
    }
)

export const resetPassword = createAsyncThunk(
    "NOTE/PATCH_RESET_PASSWORD",
    async (content) => {
        const endpoint = "api/Notes/" + content.url + "/check-password";
        const data = patchAPI(endpoint, content)
        return data;
    }
)
export const loginNote = createAsyncThunk(
    "NOTE/PATCH_Login_NOTE",
    async (urlAndPass) => {
        const endpoint = "api/Notes/login";
        const data = patchAPI(endpoint, urlAndPass)
        return data;
    }
)

//#endregion 

//#region GET API

export const GetNote = createAsyncThunk(
    "NOTE/GET_NOTE",
    async (Url) => {
        const token = localStorage.getItem("token");
        console.log(token);
        const endpoint = PREFIX + Url;
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
        if (response.status === 404) {
            return {
                url: Url,
                note: null,
                password: null,
                setPassword: false,
                newUrl: null,
            };
        }
        if (response.status === 401) {
            return {
                url: Url,
                setPassword: true,
                status: 401
            };
        }
        const data = response.json();
        return data;
    }
)

//Check jwt
export const GetEditNoteStatus = createAsyncThunk(
    "NOTE/GET_STATUS_lOCK_NOTE",
    async (Url) => {
        const token = localStorage.getItem("token");
        console.log("GET STATUS JWT, TOKEN : ", token);
        const PREFIX = "https://localhost:5001/api/token/"
        const endpoint = PREFIX + Url + "/jwt";
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
        return response.json();
    }
)

export const checkURL = createAsyncThunk(
    'NOTE/GET_CHECK_URL',
    async () => {
        const endpoint = PREFIX + "newPath";
        const response = await fetch(endpoint)
        const data = response.json();
        return data;
    }
)

//#endregion



const initialState = {
    err: null,
    note: {
        url: pathname,
        note: null,
        password: null,
        setPassword: false,
        newUrl: null,
    },
    loginNote: null,
    UpdateNote: null,
    checkURL: null,
    GetNote: null,
    editNote: false,
    loginNote: null,
    UpdateUrl: {
        loading: false,
        url: null,
        use: false,
    },
    checkPassword: null,
    GetEditNoteStatus: null,
    pending: null,
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
        
        [GetNote.fulfilled]: (state, action) => {
            state.GetNote = action.payload.Note;
            state.note = action.payload;
        },
        [GetNote.rejected]: (state, action) => {
            state.err = action.error;
        },

        //set state editNote
        [GetEditNoteStatus.fulfilled]: (state, action) => {
            state.GetEditNoteStatus = action.payload;
            state.editNote = action.payload.edit;
        },
        [GetEditNoteStatus.rejected]: (state, action) => {
            state.err = action.error;
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
        [UpdateUrl.pending]: (state, action) => {
            state.UpdateUrl.loading = true;
            // state.note = action.payload;
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

        [UpdatePassword.fulfilled]: (state, action) => {
            if (action.payload.token) {
                localStorage.setItem('token', action.payload.token);
            }
            state.UpdatePassword = action.payload;
            state.pending = false;
        },
        [UpdatePassword.pending]: (state, action) => {
            state.pending = true;
        },
        [UpdatePassword.rejected]: (state, action) => {
            state.err = action.error;
        },

        [checkPassword.fulfilled]: (state, action) => {
            if (action.payload.token) {
                localStorage.setItem('token', action.payload.token);
            }
            state.checkPassword = action.payload;

        },
        [checkPassword.rejected]: (state, action) => {
            state.err = action.error;
        },

        [resetPassword.fulfilled]: (state, action) => {
            state.resetPassword = action.payload;
            state.note = action.payload;
            localStorage.clear();
        },
        [resetPassword.rejected]: (state, action) => {
            state.resetPassword.err = action.error;
        },
    }
})

// Action creators are generated for each case reducer function
export const noteActions = noteSlice.actions
export default noteSlice.reducer