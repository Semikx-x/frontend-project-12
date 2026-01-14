import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './LoginSlice.js'

export const store = configureStore({
  reducer: {
    login: loginReducer
  }
})