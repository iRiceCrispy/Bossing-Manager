import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelected } from '../../context/SelectedContext';
import TagsDropDown from './TagsDropDown';
import SearchDropDown from './SearchDropDown';
import { createDrop, editDrop } from '../../store/drops';
import bossList from '../../util/bossList.json';
import itemList from '../../util/itemList.json';
import './forms.css';

const DropForm = ({ showForm, party, drop, edit }) => {
  const dispatch = useDispatch();
  const [bossId, setBossId] = useState(edit ? drop.bossName : '');
  const [itemId, setIemId] = useState(edit ? drop.itemName : '');
  const [image, setImage] = useState(edit ? drop.image : '');
  const [members, setMembers] = useState(edit
    ? drop.members.map(mem => ({ id: mem.user.id, value: mem.user.username }))
    : party.members.map(user => ({ id: user.id, value: user.username })));
  const [errors, setErrors] = useState([]);
  const { setSelectedDrop } = useSelected();

  const bosses = Object.entries(bossList).reduce((accum, [key, value]) => {
    accum.push({ id: key, value: value.name });
    return accum;
  }, []);
  const boss = bossList[bossId];

  const items = boss
    ? bossList[bossId].drops.reduce((accum, value) => {
      accum.push({ id: value, value });
      return accum;
    }, [])
    : undefined;
  const item = itemList[itemId];

  const submitForm = e => {
    e.preventDefault();
    setErrors([]);

    if (!edit) {
      const newDrop = {
        bossName: bossId,
        itemName: itemId,
        image,
        memberIds: members.map(member => member.id),
      };

      dispatch(createDrop(party.id, newDrop))
        .then(drp => {
          showForm(false);
          setSelectedDrop(drp.id);
        })
        .catch(async res => {
          const data = await res.json();

          if (data?.errors) setErrors(data.errors);
        });
    }
    else {
      const bossChanged = bossId.id !== drop.bossName;
      const itemChanged = itemId.id !== drop.itemName;
      const imageChanged = image !== drop.image;
      const membersChanged = JSON.stringify(members.map(member => member.id))
        !== JSON.stringify(drop.members.map(member => member.user.id));

      if (bossChanged || itemChanged || imageChanged || membersChanged) {
        const editedDrop = {
          bossName: bossId,
          itemName: itemId,
          image,
          memberIds: members.map(member => member.id),

        };

        dispatch(editDrop(drop.id, editedDrop))
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
    <div className='formContainer dropForm'>
      <form onSubmit={submitForm}>
        <header>
          <h2 className='formTitle'>{edit ? 'Edit drop' : 'Add a drop'}</h2>
        </header>
        <ul className='errors'>
          {errors.map((error, idx) => (
            <li className='error' key={idx}>{error}</li>
          ))}
        </ul>
        <div className='formContent'>
          <div>
            Boss
            <SearchDropDown
              options={bosses}
              result={boss?.name}
              setResult={setBossId}
            />
          </div>
          <div>
            Item
            <SearchDropDown
              options={items}
              disabled={!bossId}
              result={item?.name}
              setResult={setIemId}
            />
          </div>
          <label>
            Image (optional)
            <input type='text' value={image} onChange={e => setImage(e.target.value)} />
          </label>
          <div className='tags'>
            Members
            <TagsDropDown
              options={(edit ? drop.party.members : party.members)
                .map(user => ({ id: user.id, value: user.username }))}
              results={members}
              setResult={setMembers}
            />
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
