import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const restoreSession = createAsyncThunk(
  'session/restore',
  async () => {
    const res = await axios.get('/api/session');

    return res.data;
  },
);

export const signup = createAsyncThunk(
  'session/signup',
  async ({ username, email, password }) => {
    const res = await axios.post('/api/user', {
      username,
      email,
      password,
    });

    return res.data;
  },
);

export const login = createAsyncThunk(
  'session/login',
  async ({ credential, password }) => {
    const res = await axios.post('/api/session', {
      credential,
      password,
    });

    return res.data;
  },
);

export const demo = createAsyncThunk(
  'session/login',
  async () => {
    const res = await axios.post('/api/session/demo');

    return res.data;
  },
);

export const logout = createAsyncThunk(
  'session/logout',
  async () => {
    const res = await axios.delete('/api/session');

    return res.data;
  },
);

const initialState = { user: null };

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(restoreSession.rejected, (state) => {
        state.user = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const getSessionUser = state => state.session.user;

export default sessionSlice.reducer;
