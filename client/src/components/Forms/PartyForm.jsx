import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSelected } from '../../context/SelectedContext';
import Tags from './Tags';
import SearchMenu from './SearchMenu';
import { createParty, editParty } from '../../store/parties';
import './forms.css';

const PartyForm = ({ showForm, party, edit }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(edit ? party.name : '');
  const [members, setMembers] = useState(edit ? party.members : []);
  const [input, setInput] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [errors, setErrors] = useState([]);
  const { setSelectedParty } = useSelected();
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
    setErrors([]);

    if (!edit) {
      const newParty = {
        name,
        leaderId: sessionUser.id,
        memberIds: members.map(member => member.id),
      };

      dispatch(createParty(newParty))
        .then(pt => {
          setSelectedParty(pt.id);
          showForm(false);
        })
        .catch(async res => {
          const data = await res.json();

          if (data?.errors) setErrors(data.errors);
        });
    }
    else {
      const nameChanged = name !== party.name;
      const membersChanged = JSON.stringify(members.map(member => member.id))
        !== JSON.stringify(party.members.map(member => member.id));

      if (nameChanged || membersChanged) {
        const editedParty = {
          name,
          memberIds: members.map(member => member.id),
        };

        dispatch(editParty(party.id, editedParty))
          .then(() => showForm(false))
          .catch(async res => {
            const data = await res.json();

            if (data?.errors) setErrors(data.errors);
          });
      }
      else showForm(false);
    }
  };

  return (
    <div className='formContainer partyForm'>
      <form onSubmit={submitForm}>
        <header>
          <h2 className='formTitle'>{edit ? 'Edit party' : 'Create new a party'}</h2>
        </header>
        <ul className='errors'>
          {errors.map((error, idx) => (
            <li className='error' key={idx}>{error}</li>
          ))}
        </ul>
        <div className='formContent'>
          <label>
            Name
            <input type='text' value={name} onChange={e => setName(e.target.value)} />
          </label>
          <label htmlFor='search'>
            Members
            <div className='memberSearch'>
              <div className='tagsContainer'>
                {members?.map(member => (
                  <Tags key={member.id} username={member.username} setMembers={setMembers} />
                ))}
                <input
                  className='search'
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
                {input && showSearch && <SearchMenu matches={matches} addMember={addMember} />}
              </div>
            </div>
          </label>
        </div>
        <footer>
          <button className='btn filled submit' type='submit'>{edit ? 'Confirm' : 'Create Party'}</button>
        </footer>
      </form>
    </div>
  );
};

export default PartyForm;
