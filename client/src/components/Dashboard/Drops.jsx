import React from 'react';
import { useSelector } from 'react-redux';
import { useSelected } from '../../context/SelectedContext';
import bossList from '../../util/bossList.json';
import itemList from '../../util/itemList.json';
import './Drops.scss';

const Drops = () => {
  const { selectedParty, selectedDrop, setSelectedDrop } = useSelected();
  const party = useSelector(state => state.parties[selectedParty]);
  const dropsList = Object.values(useSelector(state => state.drops));
  const drops = party
    ? dropsList.filter(drop => drop.party.id === party.id)
    : dropsList;

  return (
    <div className='dropsContainer'>
      <p className='heading'>Drops</p>
      {drops.map(drop => {
        const isSelected = selectedDrop === drop.id;
        const boss = bossList[drop.bossName];
        const item = itemList[drop.itemName];

        return (
          <div className={`drop${isSelected ? ' selected' : ''}`} key={drop.id} onClick={() => setSelectedDrop(drop.id)}>
            <p className='bossName'>{boss.name}</p>
            <p className='itemName'>{item.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Drops;
