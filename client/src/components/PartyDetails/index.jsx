import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import bossList from '../../util/bossList.json';
import itemList from '../../util/itemList.json';
import './PartyDetails.scss';

const PartyDetails = () => {
  const { id } = useParams();
  const party = useSelector(state => state.parties[id]);
  const sessionUser = useSelector(state => state.session.user);
  const drops = Object.values(useSelector(state => state.drops))
    .filter(drop => drop.party.id === party?.id);

  if (!party) return <div id='notFound'>The party you are looking for has either been deleted, or does not exist.</div>;

  const { name, leader, members } = party;
  const isLeader = leader.id === sessionUser.id;
  members.sort((a, b) => (b.id === sessionUser.id) - (a.id === sessionUser.id));

  return (
    <div className='partyDetails'>
      <div className='details'>
        <h3 className='partyName'>
          {name}
        </h3>
        <p className='partyLeader'>
          Leader:
          {' '}
          {leader.username}
        </p>
        <div className='partyMembers'>
          <p>Members:</p>
          {members.map(member => (
            <p className='partyMember' key={member.id}>
              {member.id === sessionUser.id ? 'You' : member.username}
            </p>
          ))}
        </div>
        {isLeader && (
          <>
            <div className='modifyingButtons'>
              <button className='btn transparent edit' type='button'>
                <FontAwesomeIcon icon='fa-solid fa-pen-to-square' />
              </button>
              <button className='btn transparent delete' type='button'>
                <FontAwesomeIcon icon='fa-solid fa-trash-can' />
              </button>
            </div>
            <div className='createButton'>
              <button className='btn transparent add' type='button'>Add a drop</button>
            </div>
          </>
        )}
      </div>
      <div className='drops'>
        <p className='heading'>Drops</p>
        <ul className='dropList'>
          {!drops.length
            ? <p>There are currently no drops for this party.</p>
            : drops.map(drop => {
              const boss = bossList[drop.bossName];
              const item = itemList[drop.itemName];

              return (
                <li key={drop.id}>
                  <Link
                    className='drop'
                    sold={drop.sold.toString()}
                    to={`/dashboard/drops/${drop.id}`}
                  >
                    <p className='bossName'>{boss.name}</p>
                    <p className='itemName'>{item.name}</p>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default PartyDetails;
