import React from 'react';
import { useSelector } from 'react-redux';
import './Drops.css';

const Drops = ({ party, setSelected, selected }) => {
  const dropsList = Object.values(useSelector(state => state.drops));
  const drops = Object.keys(party).length
    ? dropsList.filter(drop => drop.party.id === party.id)
    : dropsList;

  return (
    <div className='dropsContainer'>
      <p className='heading'>Drops</p>
      {drops.map(drop => {
        const isSelected = selected?.id === drop.id;
        return (
          <div className={`drop${isSelected ? ' selected' : ''}`} key={drop.id} onClick={() => setSelected(drop)}>
            <p className='bossName'>{drop.bossName}</p>
            <p className='itemName'>{drop.itemName}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Drops;
