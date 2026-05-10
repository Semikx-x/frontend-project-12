import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async function (token1, { rejectWithValue }) {
    const token = localStorage.getItem('JWT')
    try {
      const response = await axios.get('/api/v1/messages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data

    } catch (error) {
      return rejectWithValue(getError(error))
    }
  }
)

export const addMessage = createAsyncThunk(
  'messages/addMessage',
  async function (message, { rejectWithValue }) {
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
      return rejectWithValue(getError(error))
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
        state.error = null;
        console.log(state.message)
      })
      .addCase(addMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Произошла ошибка';
      });
  }
})

function getError(error) {
  if (!error.response.status) {
    return 'Ошибка сети'
  }
  return 'Ошибка при загрузке данных'
}

export default messagesSlice.reducer

export const { newMessage } = messagesSlice.actions

export const selectStatus = (state) => state.messages.status
export const selectError = (state) => state.messages.error
export const selectMessages = (state) => state.messages.message
