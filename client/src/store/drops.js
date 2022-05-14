import axios from 'axios';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const fetchDrops = createAsyncThunk('drops/fetch', async () => {
  const res = await axios.get('/api/drops');

  return res.data;
});

export const createDrop = createAsyncThunk('drops/create', async (drop) => {
  const res = await axios.post('/api/drops', drop);

  return res.data;
});

export const updateDrop = createAsyncThunk('drop/update', async (drop) => {
  const { id } = drop;
  const res = await axios.pust(`/api/parties/${id}`, drop);

  return res.data;
});

export const deleteDrop = createAsyncThunk('drop/delete', async (id) => {
  const res = await axios.delete(`/api/parties/${id}`);

  return res.data;
});

export const addSale = createAsyncThunk('drop/sale/add', async ({ id, sale }) => {
  const res = await axios.post(`/api/drops/${id}/sale`, sale);

  return res.data;
});

export const updateSale = createAsyncThunk('drop/sale/update', async ({ id, sale }) => {
  const res = await axios.put(`/api/drops/${id}/sale`, sale);

  return res.data;
});

export const deleteSale = createAsyncThunk('drop/sale/delete', async (id) => {
  const res = await axios.delete(`/api/drops/${id}/sale`);

  return res.data;
});

export const payMember = createAsyncThunk('drop/members/pay', async ({ dropId, memberId }) => {
  const res = await axios.post(`/api/drops/${dropId}/members/${memberId}/payment`);

  return res.data;
});

export const unpayMember = createAsyncThunk('drop/members/unpay', async ({ dropId, memberId }) => {
  const res = await axios.delete(`/api/drops/${dropId}/members/${memberId}/payment`);

  return res.data;
});

const dropsAdapter = createEntityAdapter();

const initialState = dropsAdapter.getInitialState();

const dropsSlice = createSlice({
  name: 'drops',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchDrops.fulfilled, dropsAdapter.setMany);
  },
});

export const dropsSelectors = dropsAdapter.getSelectors(state => state.drops);

export default dropsSlice.reducer;
