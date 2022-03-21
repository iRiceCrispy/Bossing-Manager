import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Tags from './Tags';
import SearchMenu from './SearchMenu';
import { createDrop } from '../../store/drops';

const DropForm = ({ showForm, party }) => {
  const dispatch = useDispatch();
  const [bossName, setBossName] = useState('');
  const [itemName, setItemName] = useState('');
  const [image, setImage] = useState('');
  const [members, setMembers] = useState(party.members);
  const [input, setInput] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const matches = party.members
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

    const newDrop = {
      bossName,
      itemName,
      memberIds: members.map(member => member.id),
    };

    dispatch(createDrop(party.id, newDrop));

    showForm(false);
  };

  return (
    <div className='formContainer'>
      <h2 className='formTitle'>Add a drop</h2>
      <form onSubmit={submitForm}>
        <label>
          Boss
          <input type='text' value={bossName} onChange={e => setBossName(e.target.value)} required />
        </label>
        <label>
          Item
          <input type='text' value={itemName} onChange={e => setItemName(e.target.value)} required />
        </label>
        <label>
          Image
          <input type='text' value={image} onChange={e => setImage(e.target.value)} required />
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
        <button type='submit'>Create Drop</button>
      </form>
    </div>
  );
};

export default DropForm;
