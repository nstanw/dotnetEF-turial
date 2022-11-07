import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  SendMail: {
    status: '',
    body: {},
    isLoading: false,
    isSussces: false,
    isError: false,
    err: {
      status: '',
      Message: '',
    },
  },
  isShowForm: true,
  show: true,
  showMobile: false,
  darkModeForm: {
    header: 'form-header',
    bodyRight: 'form-body-right',
    bodyLeft: 'form-body-left',
    port: 'Port'
  }
}

export const SendMail = createAsyncThunk(
  "FORM/SEND_MAIL",
  async (body) => {
    const url = 'https://localhost:44381/sendmail'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    const response = await fetch(url, options)
    const data = await response.json();
    console.log("response", data);
    console.log("response.status", {
      ...data,
      status: response.status
    });

    if (response.status === 200) {
      return {
        ...data,
        status: response.status
      }
    } else {
      return {
        ...data,
        status: response.status
      }
    }
  }
)

export const formSlice = createSlice({
  name: 'formSlice',
  initialState,
  reducers: {
    showForm: state => {
      state.isShowForm = true;
      state.isShowHeader = false;
    },
    hiddenForm: state => {
      state.isShowForm = false;
    },
    maximumForm: state => {
      state.show = false;
      state.isShowForm = true;

    },
    minximumForm: state => {
      state.show = true;
      state.isShowForm = true;
    },
    darkModeForm: state => {
      state.darkModeForm = {
        header: 'form-header-darkmode',
        bodyRight: 'form-body-right-darkmode',
        bodyLeft: 'form-body-left-darkmode',
        port: 'portColorWhite'
      }
    },
    lightModeForm: state => {
      state.darkModeForm = {
        header: 'form-header',
        bodyRight: 'form-body-right',
        bodyLeft: 'form-body-left',
      }
    },
    formMobile: state => {
      state.showMobile = true;
    },
    disableFormMobile: state => {
      state.showMobile = false;
    },
  },
  extraReducers: {
    [SendMail.fulfilled]: (state, action) => {
      state.SendMail.isSussces = true;
      state.SendMail.isError = false;
      state.SendMail.isLoading = false;
      state.SendMail.status = action.payload.status;
      state.SendMail.body = action.payload;
    },
    [SendMail.pending]: (state, action) => {
      state.SendMail.isLoading = true;
      state.SendMail.isSussces = false;
      state.SendMail.isError = false;
    },
    [SendMail.rejected]: (state, action) => {
      state.SendMail.isError = true;
      state.SendMail.isLoading = false;
      state.SendMail.isSussces = false;
    },
  }
})


export const actions = formSlice.actions
export default formSlice.reducer