import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './LoginSlice.js'
import channelReducer from './ChannelsSlice.js'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    channels: channelReducer
  }
})