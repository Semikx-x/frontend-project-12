import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const fetchJWS = createAsyncThunk(
  'login/fetchJWS',
   async function(values, { rejectWithValue }) {
    try {
      const response = await axios.post('/api/v1/login', { username: values.userName, password: values.password })
 
      const token = response.data.token
      localStorage.setItem('JWT', token);

      return { 
        token: token,
        userName: values.userName 
      }
      
    } catch (error) {
      
      if (error.response) {
        return rejectWithValue('Неверные ник или пароль')
      }
      return rejectWithValue('Ошибка сети')
    }
  }
)

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    auth: false,
    status: null,
    error: null,
    token: null,
    userName: ''
  },
  reducers: {
    restoreAuth: (state) => {
      const token = localStorage.getItem('JWT');
      if (token) {
        try {
          state.token = token;
          state.auth = true;
        } catch (e) {
          state.token = null;
          state.auth = false;
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJWS.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchJWS.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.auth = true;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(fetchJWS.rejected, (state, action) => {
        state.status = 'failed';
        state.auth = false;
        state.error = action.payload || 'Произошла ошибка';
      });
  }
})

export const { restoreAuth } = loginSlice.actions
export default loginSlice.reducer

export const selectStatus = (state) => state.login.status
export const selectError = (state) => state.login.error
export const selectAuth = (state) => state.login.auth
export const selectToken = (state) => state.login.token