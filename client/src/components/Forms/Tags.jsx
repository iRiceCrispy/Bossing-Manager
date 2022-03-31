import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Tags = ({ tag, setter }) => (
  <div className='tag'>
    <span className='name'>
      {tag}
    </span>
    <span
      className='x'
      onClick={() => setter(prev => prev.filter(item => item.value !== tag))}
    >
      <FontAwesomeIcon icon='fas fa-xmark' />
    </span>
  </div>
);

export default Tags;
