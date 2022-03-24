import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelected } from '../../context/SelectedContext';
import Tags from './Tags';
import SearchMenu from './SearchMenu';
import { createDrop, editDrop } from '../../store/drops';
import './forms.css';

const DropForm = ({ showForm, party, drop, edit }) => {
  const dispatch = useDispatch();
  const [bossName, setBossName] = useState(edit ? drop.bossName : '');
  const [itemName, setItemName] = useState(edit ? drop.itemName : '');
  const [image, setImage] = useState(edit ? drop.image : '');
  const [members, setMembers] = useState(edit ? drop.members.map(mem => mem.user) : party.members);
  const [input, setInput] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const { setSelectedDrop } = useSelected();

  const matches = (edit ? drop.party.members : party.members)
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

    if (!edit) {
      const newDrop = {
        bossName,
        itemName,
        image,
        memberIds: members.map(member => member.id),
      };

      dispatch(createDrop(party.id, newDrop)).then(drp => setSelectedDrop(drp.id));
    }
    else {
      const editedDrop = {};
      const bossChanged = bossName !== drop.bossName;
      const itemChanged = itemName !== drop.itemName;
      const imageChanged = image !== drop.image;
      const membersChanged = JSON.stringify(members.map(member => member.id))
        !== JSON.stringify(drop.members.map(member => member.user.id));

      if (bossChanged) editedDrop.bossName = bossName;
      if (itemChanged) editedDrop.itemName = itemName;
      if (imageChanged) editedDrop.image = image;
      if (membersChanged) editedDrop.memberIds = members.map(member => member.id);

      if (bossChanged || itemChanged || imageChanged || membersChanged) {
        dispatch(editDrop(drop.id, editedDrop));
      }
    }

    showForm(false);
  };

  return (
    <div className='formContainer dropForm'>
      <form onSubmit={submitForm}>
        <header>
          <h2 className='formTitle'>{edit ? 'Edit drop' : 'Add a drop'}</h2>
        </header>
        <div className='formContent'>
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
        </div>
        <footer>
          <button className='btn filled submit' type='submit'>{edit ? 'Confirm' : 'Create Drop'}</button>
        </footer>
      </form>
    </div>
  );
};

export default DropForm;
