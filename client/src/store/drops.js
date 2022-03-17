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

export const loadDrops = () => async dispatch => {
  const res = await fetch('/api/drops');

  const drops = await res.json();
  dispatch(load(drops));

  return res;
};

export const createDrop = data => async dispatch => {
  const res = await csrfFetch('/api/drops', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  const drop = await res.json();
  dispatch(create(drop));

  return res;
};

export const editDrop = (id, data) => async dispatch => {
  const res = await csrfFetch(`/api/drops/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  const drop = await res.json();
  dispatch(edit(drop));

  return res;
};

export const removeDrop = (id, data) => async dispatch => {
  const res = await csrfFetch(`/api/drops/${id}`, {
    method: 'PUT',

    body: JSON.stringify(data),
  });

  const drop = await res.json();
  dispatch(remove(drop));

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
