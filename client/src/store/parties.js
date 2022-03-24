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

  if (res.ok) {
    const parties = await res.json();
    dispatch(load(parties));

    return parties;
  }

  return res;
};

export const createParty = data => async dispatch => {
  const res = await csrfFetch('/api/parties', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const party = await res.json();
    dispatch(create(party));

    return party;
  }

  return res;
};

export const editParty = (id, data) => async dispatch => {
  const res = await csrfFetch(`/api/parties/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const party = await res.json();
    dispatch(edit(party));

    return party;
  }

  return res;
};

export const removeParty = id => async dispatch => {
  const res = await csrfFetch(`/api/parties/${id}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    const party = await res.json();
    dispatch(remove(party.id));

    return party;
  }

  return res;
};

const reducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      return action.parties;
    case CREATE:
      state[action.party.id] = action.party;

      return { ...state };
    case EDIT:
      state[action.party.id] = { ...state[action.party.id], ...action.party };

      return { ...state };
    case REMOVE:
      delete state[action.id];

      return { ...state };
    default:
      return state;
  }
};

export default reducer;
