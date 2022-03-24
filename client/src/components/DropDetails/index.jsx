import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Modal';
import DropForm from '../Forms/DropForm';
import { removeDrop } from '../../store/drops';
import './DropDetails.css';

const DropDetails = ({ drop, setDrop }) => {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const sessionUser = useSelector(state => state.session.user);

  const isLeader = drop.party.leader.id === sessionUser.id;
  const { bossName, itemName } = drop;
  const members = drop.members
    .map(member => member.user)
    .sort((a, b) => (b.id === sessionUser.id) - (a.id === sessionUser.id));

  const deleteDrop = () => {
    dispatch(removeDrop(drop.id));
    setDrop({});
  };

  return (
    <div className='dropDetails' key={drop.id}>
      <div className='details'>
        <p className='bossName'>{bossName}</p>
        <p className='itemName'>{itemName}</p>
        <p className='partyMembers'>
          Members:
        </p>
        {members.map(member => (
          <p className='partyMember' key={member.id}>
            {member.id === sessionUser.id ? 'You' : member.username}
            {' '}
          </p>
        ))}
      </div>
      {isLeader && (
      <div className='buttons'>
        {showEdit
          ? (
            <Modal showModal={setShowEdit}>
              <DropForm showForm={setShowEdit} drop={drop} edit />
            </Modal>
          )
          : <button className='btn filled' type='button' onClick={() => setShowEdit(true)}>Edit Drop</button>}
        <button className='btn filled' type='button' onClick={deleteDrop}>Delete Drop</button>
      </div>
      )}
    </div>
  );
};

export default DropDetails;
