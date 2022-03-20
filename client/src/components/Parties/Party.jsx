import React from 'react';
import { useDispatch } from 'react-redux';
import { removeParty } from '../../store/parties';

const Party = ({ party, sessionUser }) => {
  const dispatch = useDispatch();

  return (
    <div className='partyContainer'>
      {party.leaderId === sessionUser.id
        && <button type='button' onClick={() => dispatch(removeParty(party.id))}>Delete party</button>}
      <p className='partyName'>
        Name:
        {' '}
        {party.name}
      </p>
      <p className='partyLeader'>
        Leader:
        {' '}
        {party.leader.username}
      </p>
      <p className='partyMembers'>
        Members:
      </p>
      {party.members.map(member => (
        <span className='partyMember' key={member.id}>
          {member.username}
          {' '}
          {member.id === sessionUser.id ? '(yourself) ' : ''}
        </span>
      ))}
    </div>
  );
};

export default Party;
