import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../Modal';
import DropForm from '../Forms/DropForm';
import { removeDrop } from '../../store/drops';

const Drop = ({ drop, sessionUser }) => {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className='dropContainer' key={drop.id}>
      {drop.party.leader.id === sessionUser.id && (
      <div className='buttons'>
        <button type='button' onClick={() => dispatch(removeDrop(drop.id))}>Remove Drop</button>
        {showEdit
          ? (
            <Modal showModal={setShowEdit}>
              <DropForm showForm={setShowEdit} drop={drop} edit />
            </Modal>
          )
          : <button type='button' onClick={() => setShowEdit(true)}>Edit party</button>}
      </div>
      )}
      <p>{drop.bossName}</p>
      <p>{drop.itemName}</p>
      <p>{drop.members.map(member => `${member.user.username} `)}</p>
    </div>
  );
};

export default Drop;
