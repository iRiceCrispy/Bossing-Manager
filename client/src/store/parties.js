import axios from 'axios';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const fetchParties = createAsyncThunk(
  'parties/fetch',
  async () => {
    const res = await axios.get('/api/parties');

    return res.data;
  },
);

export const createParty = createAsyncThunk(
  'parties/create',
  async (party, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/parties', party);

      return res.data;
    }
    catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  },
);

export const updateParty = createAsyncThunk(
  'parties/update',
  async (party, { rejectWithValue }) => {
    try {
      const { id } = party;
      const res = await axios.put(`/api/parties/${id}`, party);

      return res.data;
    }
    catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  },
);

export const deleteParty = createAsyncThunk(
  'parties/delete',
  async (id) => {
    const res = await axios.delete(`/api/parties/${id}`);

    return res.data;
  },
);

const partiesAdapter = createEntityAdapter();

const initialState = partiesAdapter.getInitialState();

const partiesSlice = createSlice({
  name: 'parties',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchParties.fulfilled, partiesAdapter.setMany)
      .addCase(createParty.fulfilled, (state, { payload }) => {
        partiesAdapter.addOne(state, payload);
      })
      .addCase(updateParty.fulfilled, (state, { payload }) => {
        partiesAdapter.upsertOne(state, payload);
      })
      .addCase(deleteParty.fulfilled, (state, { payload }) => {
        const { id } = payload;
        partiesAdapter.removeOne(state, id);
      });
  },
});

export const partiesSelectors = partiesAdapter.getSelectors(state => state.parties);

export default partiesSlice.reducer;
