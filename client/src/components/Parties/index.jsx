import React from 'react';
import { useSelector } from 'react-redux';
import './parties.css';

const Party = ({ party, user }) => (
  <div className='partyContainer'>
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
        {member.id === user.id ? '(yourself)' : ''}
      </span>
    ))}
  </div>
);

const Parties = () => {
  const user = useSelector(state => state.session.user);
  const parties = useSelector(state => state.parties);

  const [partiesL, partiesM] = parties.reduce(([l, m], party) => (
    party.leaderId === user.id ? [[...l, party], m] : [l, [...m, party]]
  ), [[], []]);

  console.log(partiesL);
  console.log(partiesM);

  return (
    <div className='partiesContainer'>
      {partiesL.length > 0 && (
        <div className='leaderOf'>
          {partiesL.map(party => (
            <Party key={party.id} party={party} user={user} />
          ))}
        </div>
      )}
      {partiesM.length > 0 && (
        <div className='memberOf'>
          {partiesM.map(party => (
            <Party key={party.id} party={party} user={user} />
          ))}
        </div>
      )}
      {!partiesL.length && !partiesM.length && (
      <p>
        You are not part of any party.
        Either create your own, or join one.
      </p>
      )}
    </div>
  );
};

export default Parties;
