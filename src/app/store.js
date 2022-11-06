import { configureStore } from '@reduxjs/toolkit'
import formSlice from '../features/formSlice'

export const store = configureStore({
  reducer: {
    form: formSlice,
  },
})