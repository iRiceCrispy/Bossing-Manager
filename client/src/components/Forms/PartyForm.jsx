import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSelected } from '../../context/SelectedContext';
import TagsDropDown from '../FormFields/TagsDropDown';
import ValidationError from '../FormFields/ValidationError';
import { createParty, editParty } from '../../store/parties';
import './forms.scss';

const PartyForm = ({ showForm, party, edit }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(edit ? party.name : '');
  const [members, setMembers] = useState(edit
    ? party.members.map(member => ({ id: member.id, value: member.username }))
    : []);
  const [errors, setErrors] = useState([]);
  const { setSelectedParty } = useSelected();
  const sessionUser = useSelector(state => state.session.user);
  const users = Object.values(useSelector(state => state.users));

  const submitForm = e => {
    e.preventDefault();
    setErrors({});

    if (!edit) {
      const newParty = {
        name,
        leaderId: sessionUser.id,
        memberIds: members.map(member => member.id),
      };

      dispatch(createParty(newParty))
        .then(pt => {
          showForm(false);
          setSelectedParty(pt.id);
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
    <form id='partyForm' className='form' onSubmit={submitForm}>
      <header>
        <h2 className='formTitle'>{edit ? 'Edit party' : 'Create new a party'}</h2>
      </header>
      <main>
        <div className='inputContainer partyName'>
          <label htmlFor='partyName'>Party Name</label>
          <input
            id='partyName'
            type='text'
            value={name}
            placeholder='Party Name'
            onChange={e => setName(e.target.value)}
          />
          <ValidationError message={errors.name} />
        </div>
        <div className='tags'>
          <label htmlFor='partyMembers'>Members</label>
          <TagsDropDown
            id='partyMembers'
            placeholder='Members'
            options={users.map(user => ({ id: user.id, value: user.username }))}
            results={members}
            setResult={setMembers}
          />
          <ValidationError message={errors.memberIds} />
        </div>
      </main>
      <footer>
        <button className='btn light' type='submit'>{edit ? 'Confirm' : 'Create Party'}</button>
      </footer>
    </form>
  );
};

export default PartyForm;
