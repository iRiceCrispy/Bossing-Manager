import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Parties.scss';

const Parties = () => {
  const { path } = useRouteMatch();
  const sessionUser = useSelector(state => state.session.user);
  const parties = useSelector(state => Object.values(state.parties));

  return (
    <div id="parties">
      <h2>Parties</h2>
      <div className="content">
        {parties.length
          ? (
            <ul className="partyList">
              {parties.map(party => (
                <li key={party.id}>
                  <Link
                    className="party"
                    to={`${path}/${party.id}`}
                  >
                    <h3 className="partyName">{party.name}</h3>
                    <p className="partyLeader">
                      Leader:
                      {' '}
                      {party.leader.id === sessionUser.id ? 'YOU' : party.leader.username}
                    </p>
                    <div className="partyMembers">
                      Members:
                      {' '}
                      {party.members.map(member => (
                        <span className="member" key={member.id}>
                          {member.id === sessionUser.id ? 'YOU' : member.username}
                        </span>
                      ))}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )
          : (
            <p className="null">
              You are not part of any party.
              <br />
              Either create your own, or join one.
            </p>
          )}
      </div>
    </div>
  );
};

export default Parties;
