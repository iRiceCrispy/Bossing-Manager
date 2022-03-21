import React from 'react';
import { useSelector } from 'react-redux';
import './Drops.css';

const Drops = () => {
  const drops = Object.values(useSelector(state => state.drops));
  drops.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  console.log(drops);

  return (
    <div className='dropsContainer'>
      {drops.map(drop => (
        <div className='dropContainer'>
          <p>{drop.bossName}</p>
          <p>{drop.itemName}</p>
          <p>{drop.members.map(member => `${member.user.username} `)}</p>
          {/* <img src={drop.image} alt={drop.itemName} /> */}
        </div>
      ))}
    </div>
  );
};

export default Drops;
