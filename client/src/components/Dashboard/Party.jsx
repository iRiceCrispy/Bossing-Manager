import React from 'react';

const Party = ({ sessionUser, party, isLeader }) => {
  const { name, leader, members } = party;
  members.sort((a, b) => (b.id === sessionUser.id) - (a.id === sessionUser.id));

  return (
    <div className='party'>
      <p className='partyName'>
        {name}
      </p>
      {!isLeader && (
      <p className='partyLeader'>
        Leader:
        {' '}
        {leader.username}
      </p>
      )}
      <div className='partyMembers'>
        {members.map(member => (
          <span className='partyMember' key={member.id}>
            {member.id === sessionUser.id ? 'You' : member.username}
            {' '}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Party;
