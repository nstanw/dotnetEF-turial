import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isShowForm: true,
  isShowHeader: false,
  show: true,
}

export const formSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    showForm: state => {
        state.isShowForm = true;
        state.isShowHeader = false;
    },
    hiddenForm: state => {
        state.isShowForm = false;
        state.isShowHeader = true;
    },
    maximumForm: state => {
        state.show = false;
        state.isShowForm = true;

    },
    minximumForm: state => {
        state.show = true;
        state.isShowForm = true;

    },
  },
})


export const actions = formSlice.actions

export default formSlice.reducer