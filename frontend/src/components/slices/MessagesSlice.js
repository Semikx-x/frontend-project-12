import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
   async function(token, { rejectWithValue }) {
    try {
      const response = await axios.get('/api/v1/messages', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      //console.log(response.data)
      return response.data
      
    } catch (error) {
      if (error.response) {
        return rejectWithValue('Ошибка затычка')
      }
      return rejectWithValue('Ошибка сети')
    }
  }
)

export const addMessage = createAsyncThunk(
  'messages/addMessage',
   async function(message, { rejectWithValue }) {
    try {
      const token = localStorage.getItem('JWT')
      const response = await axios.post('/api/v1/messages', message, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      console.log(response.data)
      return response.data
      
    } catch (error) {
      if (error.response) {
        return rejectWithValue('Ошибка затычка')
      }
      return rejectWithValue('Ошибка сети')
    }
  }
)

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    status: null,
    error: null,
    message: [],
  },
  reducers: {
    newMessage: (state, action) => {
      state.message.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload;
        state.error = null;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Произошла ошибка';
      })
      .addCase(addMessage.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = [...state.message, action.payload];
        state.error = null;
        console.log(state.message)
      })
      .addCase(addMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Произошла ошибка';
      });
  }
})

export default messagesSlice.reducer

export const { newMessage } = messagesSlice.actions

export const selectStatus = (state) => state.messages.status
export const selectError = (state) => state.messages.error
export const selectMessages = (state) => state.messages.message
