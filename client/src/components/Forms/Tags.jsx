import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Tags = ({ username, setMembers }) => (
  <div className='tag'>
    <span className='name'>
      {username}
    </span>
    <span
      className='x'
      onClick={() => setMembers(prev => prev.filter(member => member.username !== username))}
    >
      <FontAwesomeIcon icon='fas fa-xmark' />
    </span>
  </div>
);

export default Tags;
