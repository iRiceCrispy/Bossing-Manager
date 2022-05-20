import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import socket from '../socket';

export const restoreSession = createAsyncThunk(
  'session/restore',
  async () => {
    const res = await axios.get('/api/session');
    const user = res.data;

    socket.emit('login', user.id);
    return user;
  },
);

export const signup = createAsyncThunk(
  'session/signup',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/users', {
        username,
        email,
        password,
      });
      const user = res.data;

      socket.emit('login', user.id);
      return user;
    }
    catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  },
);

export const login = createAsyncThunk(
  'session/login',
  async ({ credential, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/session', {
        credential,
        password,
      });
      const user = res.data;

      socket.emit('login', user.id);
      return user;
    }
    catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  },
);

export const demo = createAsyncThunk(
  'session/login/demo',
  async () => {
    const res = await axios.post('/api/session/demo');
    const user = res.data;

    socket.emit('login', user.id);
    return user;
  },
);

export const logout = createAsyncThunk(
  'session/logout',
  async () => {
    const res = await axios.delete('/api/session');
    const user = res.data;

    socket.emit('logout');
    return user;
  },
);

const initialState = {
  user: null,
};

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
      })
      .addCase(demo.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const getSessionUser = state => state.session.user;

export default sessionSlice.reducer;
