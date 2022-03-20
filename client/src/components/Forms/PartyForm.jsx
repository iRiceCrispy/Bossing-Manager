import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createParty } from '../../store/parties';

const Tags = ({ username, setMembers }) => (
  <div className='tag'>
    <span>
      {username}
    </span>
    {' '}
    <span onClick={() => setMembers(prev => prev.filter(member => member.username !== username))}>
      <FontAwesomeIcon icon='fas fa-xmark' />
    </span>
  </div>
);

const SearchMenu = ({ matches, addMember }) => (
  <div className='searchMenu'>
    {matches.length ? (
      matches.map(match => (
        <div className='searchResult' key={match.id} onClick={() => addMember(match)}>{match.username}</div>
      ))
    ) : (
      <p>
        No users found.
      </p>
    )}
  </div>
);

const PartyForm = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [members, setMembers] = useState([]);
  const [input, setInput] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  const users = Object.values(useSelector(state => state.users));

  const matches = users
    .filter(user => user.username.toLowerCase().includes(input.toLowerCase())
      && !members.some(member => member.username === user.username))
    .sort((a, b) => a.username.localeCompare(b.username))
    .slice(0, 6);

  const addMember = (match = matches[0]) => {
    if (!match) return;

    setMembers(prev => [...new Set([...prev, match])]
      .sort((a, b) => a.username.localeCompare(b.username)));
    setInput('');
    setShowSearch(false);
  };

  const submitForm = e => {
    e.preventDefault();

    const party = {
      name,
      leaderId: sessionUser.id,
      memberIds: members.map(member => member.id),
    };

    dispatch(createParty(party));
    setShowModal(false);
  };

  return (
    <div className='formContainer'>
      <form onSubmit={submitForm}>
        <label>
          Name
          <input type='text' value={name} onChange={e => setName(e.target.value)} required />
        </label>
        <div>
          Members
          <div className='memberSearch'>
            <div className='tagsContainer'>
              {members?.map(member => (
                <Tags key={member.id} username={member.username} setMembers={setMembers} />
              ))}
              <input
                type='search'
                value={input}
                onChange={e => {
                  setInput(e.target.value);
                  setShowSearch(true);
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addMember();
                  }
                }}
              />
            </div>
            {input && showSearch && <SearchMenu matches={matches} addMember={addMember} />}
          </div>
        </div>
        <button type='submit'>Create Party</button>
      </form>
    </div>
  );
};

export default PartyForm;
