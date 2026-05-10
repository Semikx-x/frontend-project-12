import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
   async function(token1, { rejectWithValue }) {
    const token = localStorage.getItem('JWT')
    try {
      const response = await axios.get('/api/v1/channels', {
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
      return rejectWithValue(getError(error))
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
      return rejectWithValue(getError(error))
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
      return rejectWithValue(getError(error))
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
    },
    newChannel: (state, action) => {
      state.chats.unshift(action.payload);
    },
    removeChannel: (state, action) => {
      state.chats = state.chats.filter(chat => chat.id !== action.payload);

      if (state.activeChat === action.payload) {
        state.activeChat = null;
      }
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
        state.error = null;
      })
      .addCase(addChannel.rejected, (state, action) => {
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

export default channelsSlice.reducer

export const { setActive, newChannel, removeChannel } = channelsSlice.actions

export const selectStatus = (state) => state.channels.status
export const selectError = (state) => state.channels.error
export const selectChannels = (state) => state.channels.chats
export const selectActive = (state) => state.channels.activeChat
