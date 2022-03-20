const LOAD = 'users/LOAD';

const load = users => ({
  type: LOAD,
  users,
});

export const loadUsers = () => async dispatch => {
  const res = await fetch('/api/users');

  const users = await res.json();
  dispatch(load(users));

  return res;
};

const reducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      return action.users;
    default:
      return state;
  }
};

export default reducer;
