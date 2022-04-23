import React from 'react';
import { useSelector } from 'react-redux';
import Party from './Party';
import './Parties.scss';

const Parties = () => {
  const sessionUser = useSelector(state => state.session.user);
  const parties = Object.values(useSelector(state => state.parties));

  const [partiesL, partiesM] = parties.reduce(([l, m], party) => (
    party.leader.id === sessionUser.id ? [[...l, party], m] : [l, [...m, party]]
  ), [[], []]);

  return (
    <div className='partiesContainer'>
      {partiesL.length > 0 && (
        <div className='leaderOf'>
          <p className='heading'>Parties you lead</p>
          {partiesL.map(party => (
            <Party
              key={party.id}
              sessionUser={sessionUser}
              party={party}
              isLeader
            />
          ))}
        </div>
      )}
      {partiesM.length > 0 && (
        <div className='memberOf'>
          <p className='heading'>Parties you are in</p>
          {partiesM.map(party => (
            <Party
              key={party.id}
              sessionUser={sessionUser}
              party={party}
            />
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
