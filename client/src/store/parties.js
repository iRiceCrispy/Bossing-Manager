import { csrfFetch } from './csrf';

const LOAD = 'parties/LOAD';
const CREATE = 'parties/CREATE';
const EDIT = 'parties/EDIT';
const REMOVE = 'parties/REMOVE';

const load = parties => ({
  type: LOAD,
  parties,
});

const create = party => ({
  type: CREATE,
  party,
});

const edit = party => ({
  type: EDIT,
  party,
});

const remove = id => ({
  type: REMOVE,
  id,
});

export const loadParties = () => async dispatch => {
  const res = await fetch('/api/parties');

  const parties = await res.json();
  dispatch(load(parties));

  return res;
};

export const createParty = data => async dispatch => {
  const res = await csrfFetch('/api/parties', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  const party = await res.json();
  dispatch(create(party));

  return res;
};

export const editParty = (id, data) => async dispatch => {
  const res = await csrfFetch(`/api/parties/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  const party = await res.json();
  dispatch(edit(party));

  return res;
};

export const removeParty = (id, data) => async dispatch => {
  const res = await csrfFetch(`/api/parties/${id}`, {
    method: 'PUT',

    body: JSON.stringify(data),
  });

  const party = await res.json();
  dispatch(remove(party));

  return res;
};

const reducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      return action.data;
    case CREATE:
      state.leaderOf[action.party.id] = action.party;

      return { ...state };
    case EDIT:
      state.leaderOf[action.party.id] = { ...state.leaderOf[action.party.id], ...action.party };

      return { ...state };
    case REMOVE:
      delete state.leaderOf[action.party.id];

      return { ...state };
    default:
      return state;
  }
};

export default reducer;
