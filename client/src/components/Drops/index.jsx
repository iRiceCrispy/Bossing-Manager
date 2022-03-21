import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeDrop } from '../../store/drops';
import './Drops.css';

const Drops = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const drops = Object.values(useSelector(state => state.drops));
  drops.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <div className='dropsContainer'>
      {drops.map(drop => (
        <div className='dropContainer' key={drop.id}>
          {drop.party.leader.id === sessionUser.id
            && <button type='button' onClick={() => dispatch(removeDrop(drop.id))}>Remove Drop</button>}
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
