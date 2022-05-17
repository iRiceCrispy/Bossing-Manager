import axios from 'axios';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const fetchDrops = createAsyncThunk(
  'drops/fetch',
  async () => {
    const res = await axios.get('/api/drops');

    return res.data;
  },
);

export const createDrop = createAsyncThunk(
  'drops/create',
  async ({ partyId, drop }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/api/parties/${partyId}/drops`, drop);

      return res.data;
    }
    catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  },
);

export const updateDrop = createAsyncThunk(
  'drop/update',
  async (drop, { rejectWithValue }) => {
    try {
      const { id } = drop;
      const res = await axios.put(`/api/drops/${id}`, drop);

      return res.data;
    }
    catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  },
);

export const deleteDrop = createAsyncThunk(
  'drop/delete',
  async (id) => {
    const res = await axios.delete(`/api/drops/${id}`);

    return res.data;
  },
);

export const addSale = createAsyncThunk(
  'drop/sale/add',
  async ({ dropId, sale }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/api/drops/${dropId}/sale`, sale);

      return res.data;
    }
    catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  },
);

export const deleteSale = createAsyncThunk(
  'drop/sale/delete',
  async (id) => {
    const res = await axios.delete(`/api/drops/${id}/sale`);

    return res.data;
  },
);

export const payMember = createAsyncThunk(
  'drop/members/pay',
  async ({ dropId, memberId }) => {
    const res = await axios.post(`/api/drops/${dropId}/members/${memberId}/payment`);

    return res.data;
  },
);

export const unpayMember = createAsyncThunk(
  'drop/members/unpay',
  async ({ dropId, memberId }) => {
    const res = await axios.delete(`/api/drops/${dropId}/members/${memberId}/payment`);

    return res.data;
  },
);

const dropsAdapter = createEntityAdapter();

const initialState = dropsAdapter.getInitialState();

const dropsSlice = createSlice({
  name: 'drops',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrops.fulfilled, dropsAdapter.setMany)
      .addCase(createDrop.fulfilled, (state, { payload }) => {
        dropsAdapter.addOne(state, payload);
      })
      .addCase(updateDrop.fulfilled, (state, { payload }) => {
        dropsAdapter.upsertOne(state, payload);
      })
      .addCase(deleteDrop.fulfilled, (state, { payload }) => {
        const { id } = payload;
        dropsAdapter.removeOne(state, id);
      })
      .addCase(addSale.fulfilled, (state, { payload }) => {
        dropsAdapter.upsertOne(state, payload);
      })
      .addCase(deleteSale.fulfilled, (state, { payload }) => {
        dropsAdapter.upsertOne(state, payload);
      })
      .addCase(payMember.fulfilled, (state, { payload }) => {
        dropsAdapter.upsertOne(state, payload);
      })
      .addCase(unpayMember.fulfilled, (state, { payload }) => {
        dropsAdapter.upsertOne(state, payload);
      });
  },
});

export const dropsSelectors = dropsAdapter.getSelectors(state => state.drops);

export default dropsSlice.reducer;
