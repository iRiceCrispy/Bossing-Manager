import React from 'react';
import { useSelector } from 'react-redux';
import Drop from './Drop';

import './Drops.css';

const Drops = () => {
  const sessionUser = useSelector(state => state.session.user);
  const drops = Object.values(useSelector(state => state.drops));
  drops.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <div className='dropsContainer'>
      {drops.map(drop => (
        <Drop key={drop.id} drop={drop} sessionUser={sessionUser} />
      ))}
    </div>
  );
};

export default Drops;
