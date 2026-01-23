import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
   async function(token, { rejectWithValue }) {
    try {
      const response = await axios.get('/api/v1/channels', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

      return response.data
      
    } catch (error) {
      if (error.response) {
        return rejectWithValue('нет токена для каналов')
      }
      return rejectWithValue('Ошибка сети')
    }
  }
)

export const deleteChannel = createAsyncThunk(
  'channels/deleteChannel',
   async function(chatID, { rejectWithValue }) {
    try {
      const token = localStorage.getItem('JWT')
      const response = await axios.delete(`/api/v1/channels/${chatID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

      return response.data
      
    } catch (error) {
      if (error.response) {
        return rejectWithValue('нет токена для каналов')
      }
      return rejectWithValue('Ошибка сети')
    }
  }
)

export const renameChannel = createAsyncThunk(
  'channels/renameChannel',
   async function({ id, name }, { rejectWithValue }) {
    try {
      const token = localStorage.getItem('JWT')
      console.log({ id })
      const response = await axios.patch(`/api/v1/channels/${id}`, { name }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      console.log('канал изменен')
      return response.data
      
    } catch (error) {
      if (error.response) {
        return rejectWithValue('нет токена для каналов')
      }
      return rejectWithValue('Ошибка сети')
    }
  }
)

export const addChannel = createAsyncThunk(
  'channels/addChannel',
   async function(name, { rejectWithValue }) {
    try {
      const token = localStorage.getItem('JWT')
      const response = await axios.post('/api/v1/channels', name, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      return response.data
      
    } catch (error) {
      if (error.response) {
        return rejectWithValue('нет токена для каналов')
      }
      return rejectWithValue('Ошибка сети')
    }
  }
)

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    status: null,
    error: null,
    chats: [],
    activeChat: null
  },
  reducers: {
    setActive: (state, action) => {
      state.activeChat = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.chats = action.payload;
        state.error = null;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Произошла ошибка';
      })
      .addCase(deleteChannel.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteChannel.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.chats = state.chats.filter(chat => chat.id !== action.payload.id)
        state.error = null;
      })
      .addCase(deleteChannel.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Произошла ошибка';
      })
      .addCase(renameChannel.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(renameChannel.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.chats.findIndex(chat => chat.id === action.payload.id);
          if (index !== -1) {
            state.chats[index] = action.payload;
          }
        console.log(state.chats)
        state.error = null;
      })
      .addCase(renameChannel.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Произошла ошибка';
      })
      .addCase(addChannel.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addChannel.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.chats = [...state.chats, action.payload]
        state.error = null;
      })
      .addCase(addChannel.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Произошла ошибка';
      });
  }
})

export default channelsSlice.reducer

export const { setActive } = channelsSlice.actions

export const selectStatus = (state) => state.channels.status
export const selectError = (state) => state.channels.error
export const selectChannels = (state) => state.channels.chats
export const selectActive = (state) => state.channels.activeChat
