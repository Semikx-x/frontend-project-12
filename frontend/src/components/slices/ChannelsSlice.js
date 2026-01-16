import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
   async function() {
    try {
      const token = localStorage.getItem('JWT')
      const response = await axios.get('/api/v1/channels', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

      console.log(response.data)

      return response.data
      
    } catch (error) {
    if (error.response)
      throw new  Error('Проебал')
    }
  }
)

const channelsSlice = createSlice({
  name: 'chanels',
  initialState: {
    status: null,
    error: null,
    userName: '',
    channels: []
  },
  extraReducers: (builder) => {
      builder
        .addCase(fetchJWS.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(fetchJWS.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.channels = action.payload.data;
          state.error = null;
        })
        .addCase(fetchJWS.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload || 'Произошла ошибка';
        });
    }
})

export default channelsSlice.reducer

export const selectStatus = (state) => state.channels.status
export const selectError = (state) => state.channels.error
export const selectChannels = (state) => state.channels.channels