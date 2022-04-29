import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import bossList from '../../util/bossList.json';
import itemList from '../../util/itemList.json';
import './Drops.scss';

const Drops = () => {
  const { path } = useRouteMatch();
  const drops = useSelector(state => Object.values(state.drops));

  return (
    <div id='drops'>
      <h2>Drops</h2>
      <div className='content'>
        {drops.length
          ? (
            <ul className='dropList'>
              {drops.map(drop => {
                const boss = bossList[drop.bossName];
                const item = itemList[drop.itemName];

                return (
                  <li key={drop.id}>
                    <Link
                      className='drop'
                      sold={drop.sold.toString()}
                      to={`${path}/${drop.id}`}
                    >
                      <h3 className='bossName'>{boss.name}</h3>
                      <p className='itemName'>{item.name}</p>
                      <Link className='partyLink' to={`/dashboard/parties/${drop.party.id}`}>{drop.party.name}</Link>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )
          : (
            <p className='null'>
              No drops have been added yet.
            </p>
          )}
      </div>
    </div>
  );
};

export default Drops;
