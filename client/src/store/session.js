import { csrfFetch } from './csrf';

const LOGIN = 'session/login';
const LOGOUT = 'session/logout';

const loginUser = user => ({
  type: LOGIN,
  user,
});

const logoutUser = () => ({
  type: LOGOUT,
});

export const login = user => async dispatch => {
  const { credential, password } = user;

  const res = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({ credential, password }),
  });

  const data = await res.json();
  dispatch(loginUser(data.user));

  return res;
};

export const signup = user => async dispatch => {
  const { username, email, password } = user;

  const res = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();
  dispatch(loginUser(data.user));

  return res;
};

export const restoreUser = () => async dispatch => {
  const res = await csrfFetch('/api/session');

  const data = await res.json();
  dispatch(loginUser(data.user));

  return res;
};

export const logout = () => async dispatch => {
  const res = await csrfFetch('/api/session', {
    method: 'DELETE',
  });

  dispatch(logoutUser());

  return res;
};

const sessionReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case LOGIN:
      return { user: action.user };
    case LOGOUT:
      return { user: null };
    default:
      return state;
  }
};

export default sessionReducer;
