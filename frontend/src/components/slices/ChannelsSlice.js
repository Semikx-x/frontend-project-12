import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
   async function(value, { rejectWithValue }) {
    try {
      console.log(value)
      const response = await axios.get('/api/v1/channels', {
      headers: {
        Authorization: `Bearer ${value}`,
      },
    })

      console.log('запрос пришел')
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
    channels: []
  },
  extraReducers: (builder) => {
      builder
        .addCase(fetchChannels.pending, (state) => {
          console.log('start')
          state.status = 'loading';
          state.error = null;
        })
        .addCase(fetchChannels.fulfilled, (state, action) => {
          console.log('vin')
          state.status = 'succeeded';
          state.channels = action.payload;
          state.error = null;
          console.log(state.channels)
        })
        .addCase(fetchChannels.rejected, (state, action) => {
          console.log('lose')
          state.status = 'failed';
          state.error = action.payload || 'Произошла ошибка';
        });
    }
})

export default channelsSlice.reducer

export const selectStatus = (state) => state.channels.status
export const selectError = (state) => state.channels.error
export const selectChannels = (state) => state.channels.channels