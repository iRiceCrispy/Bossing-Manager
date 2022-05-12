import { csrfFetch } from './csrf';

const LOAD = 'drops/LOAD';
const CREATE = 'drops/CREATE';
const EDIT = 'drops/EDIT';
const REMOVE = 'drops/REMOVE';

const load = drops => ({
  type: LOAD,
  drops,
});

const create = drop => ({
  type: CREATE,
  drop,
});

const edit = drop => ({
  type: EDIT,
  drop,
});

const remove = id => ({
  type: REMOVE,
  id,
});

export const loadDrops = () => async (dispatch) => {
  const res = await fetch('/api/drops');

  if (res.ok) {
    const drops = await res.json();
    dispatch(load(drops));

    return drops;
  }

  return res;
};

export const createDrop = (partyId, data) => async (dispatch) => {
  const res = await csrfFetch(`/api/parties/${partyId}/drops`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const drop = await res.json();
    dispatch(create(drop));

    return drop;
  }

  return res;
};

export const editDrop = (id, data) => async (dispatch) => {
  const res = await csrfFetch(`/api/drops/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const drop = await res.json();
    dispatch(edit(drop));

    return drop;
  }

  return res;
};

export const removeDrop = id => async (dispatch) => {
  const res = await csrfFetch(`/api/drops/${id}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    const drop = await res.json();
    dispatch(remove(drop.id));

    return drop;
  }

  return res;
};

export const addSale = (id, data) => async (dispatch) => {
  const res = await csrfFetch(`/api/drops/${id}/sale`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const drop = await res.json();
    dispatch(edit(drop));

    return drop;
  }

  return res;
};

export const editSale = (id, data) => async (dispatch) => {
  const res = await csrfFetch(`/api/drops/${id}/sale`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const drop = await res.json();
    dispatch(edit(drop));

    return drop;
  }

  return res;
};

export const removeSale = id => async (dispatch) => {
  const res = await csrfFetch(`/api/drops/${id}/sale`, {
    method: 'DELETE',
  });

  if (res.ok) {
    const drop = await res.json();
    dispatch(edit(drop));

    return drop;
  }

  return res;
};

export const payMember = (dropId, memberId) => async (dispatch) => {
  const res = await csrfFetch(`/api/drops/${dropId}/members/${memberId}/payment`, {
    method: 'POST',
  });

  if (res.ok) {
    const drop = await res.json();
    dispatch(edit(drop));

    return drop;
  }

  return res;
};

export const unpayMember = (dropId, memberId) => async (dispatch) => {
  const res = await csrfFetch(`/api/drops/${dropId}/members/${memberId}/payment`, {
    method: 'DELETE',
  });

  if (res.ok) {
    const drop = await res.json();
    dispatch(edit(drop));

    return drop;
  }

  return res;
};

const reducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      return action.drops;
    case CREATE:
      state[action.drop.id] = action.drop;

      return { ...state };
    case EDIT:
      state[action.drop.id] = { ...state[action.drop.id], ...action.drop };

      return { ...state };
    case REMOVE:
      delete state[action.id];

      return { ...state };
    default:
      return state;
  }
};

export default reducer;
