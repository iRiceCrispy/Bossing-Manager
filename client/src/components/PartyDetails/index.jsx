import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Modal';
import PartyForm from '../Forms/PartyForm';
import DropForm from '../Forms/DropForm';
import { removeParty } from '../../store/parties';
import './PartyDetails.css';

const PartyDetails = ({ party }) => {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const [showDrop, setShowDrop] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  const isLeader = party.leader.id === sessionUser.id;

  const { name, leader, members } = party;
  members.sort((a, b) => (b.id === sessionUser.id) - (a.id === sessionUser.id));

  return (
    <div className='partyDetails'>
      <div className='details'>
        <p className='partyName'>
          {name}
        </p>
        <p className='partyLeader'>
          Leader:
          {' '}
          {leader.username}
        </p>
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
              <PartyForm showForm={setShowEdit} party={party} edit />
            </Modal>
          )
          : <button className='btn filled edit' type='button' onClick={() => setShowEdit(true)}>Edit party</button>}
        <button className='btn filled delete' type='button' onClick={() => dispatch(removeParty(party.id))}>Delete party</button>
        {showDrop
          ? (
            <Modal showModal={setShowDrop}>
              <DropForm showForm={setShowDrop} party={party} />
            </Modal>
          )
          : <button className='btn filled add' type='button' onClick={() => setShowDrop(true)}>Add a drop</button>}
      </div>
      )}
    </div>
  );
};

export default PartyDetails;
