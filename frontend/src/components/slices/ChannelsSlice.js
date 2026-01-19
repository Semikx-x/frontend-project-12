import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
   async function(value, { rejectWithValue }) {
    try {
      const response = await axios.get('/api/v1/channels', {
      headers: {
        Authorization: `Bearer ${value}`,
      },
    })

      return response.data
      
    } catch (error) {
      if (error.response) {
        return rejectWithValue('Ошибка затычка')
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
    chats: []
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
          console.log(state.chats)
        })
        .addCase(fetchChannels.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload || 'Произошла ошибка';
        });
    }
})

export default channelsSlice.reducer

export const selectStatus = (state) => state.channels.status
export const selectError = (state) => state.channels.error
export const selectChannels = (state) => state.channels.chats