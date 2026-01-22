import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './LoginSlice.js'
import channelReducer from './ChannelsSlice.js'
import messagesReducer from './MessagesSlice.js'
import modalReducer from './ModalSlice.js'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    channels: channelReducer,
    messages: messagesReducer,
    modal: modalReducer
  }
})