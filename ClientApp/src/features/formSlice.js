import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  showModalError: false,
  SendMail: {
    status: null,
    body: null,
    isLoading: false,
    isSussces: false,
    isError: false,

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
  async (body, thunkAPI) => {

    // try {
     // const url = 'https://localhost:44378/sendmail'
      const url = 'SendMail'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    const response = await fetch(url, options)
    const data = await response.json();


    console.log("data", data);
    // console.log("data.keys", Object.keys(data)[0]);
    // console.log("response.status", response.status);

    //handle error follow status code
    if (response.status === 400) {
      if (data.error.Status === -1) {
        const returnValue = {
          name: data.error.Message,
          message: data.error.InnerException.Message
        }
        return returnValue;
      }

      if (data.error.Status === 554) {
        const returnValue = {
          name: 'Mail Sent Falled',
          message: data.error.Message
        }
        return returnValue;
      }
    }

    //handle errors follow response results error
    if (Object.keys(data)[0] === 'error') {
      const returnValue = {
        name: 'Mail Sent Falled',
        message: data.error.Message
      }
      return returnValue;
    } else {
      return data
    }
  }
)

export const formSlice = createSlice({
  name: 'formSlice',
  initialState,
  reducers: {
    showModalError: state => {
      state.showModalError = true;
     
    },
    hideModalError: state => {
      state.showModalError = false;
      state.SendMail.body = null;
    },
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
      state.SendMail.status = action.payload.status;
      state.SendMail.body = action.payload;

      state.SendMail.isSussces = true;
      state.SendMail.isError = false;
      state.SendMail.isLoading = false;

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
      state.SendMail.body = action.error;



    },
  }
})


export const actions = formSlice.actions
export default formSlice.reducer