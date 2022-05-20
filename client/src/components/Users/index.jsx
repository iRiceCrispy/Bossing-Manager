import React from 'react';
import { useSelector } from 'react-redux';
import { usersSelectors } from '../../store/users';

const Users = () => {
  const users = useSelector(usersSelectors.selectAll);

  return (
    <div id="users">
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username}
            {' '}
            {user.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
