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

export const login = data => async (dispatch) => {
  const { credential, password } = data;

  const res = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({ credential, password }),
  });

  if (res.ok) {
    const user = await res.json();
    dispatch(loginUser(user));

    return user;
  }

  return res;
};

export const demo = () => async (dispatch) => {
  const res = await csrfFetch('/api/session/demo', {
    method: 'POST',
  });

  if (res.ok) {
    const user = await res.json();
    dispatch(loginUser(user));

    return user;
  }

  return res;
};

export const signup = data => async (dispatch) => {
  const { username, email, password, confirmPassword } = data;

  const res = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({ username, email, password, confirmPassword }),
  });

  if (res.ok) {
    const user = await res.json();
    dispatch(loginUser(user));

    return user;
  }

  return res;
};

export const restoreUser = () => async (dispatch) => {
  const res = await csrfFetch('/api/session');

  if (res.ok) {
    const user = await res.json();
    dispatch(loginUser(user));

    return user;
  }

  return res;
};

export const logout = () => async (dispatch) => {
  const res = await csrfFetch('/api/session', {
    method: 'DELETE',
  });

  if (res.ok) {
    dispatch(logoutUser());

    return res.json();
  }

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
