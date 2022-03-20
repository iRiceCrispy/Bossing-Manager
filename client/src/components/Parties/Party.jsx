import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../Modal';
import PartyForm from '../Forms/PartyForm';
import { removeParty } from '../../store/parties';

const Party = ({ party, sessionUser }) => {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const isLeader = party.leader.id === sessionUser.id;

  return (
    <div className='partyContainer'>
      {isLeader && (
        <div className='buttons'>
          <button type='button' onClick={() => dispatch(removeParty(party.id))}>Delete party</button>
          {showEdit
            ? (
              <Modal showModal={setShowEdit}>
                <PartyForm showForm={setShowEdit} party={party} edit />
              </Modal>
            )
            : <button type='button' onClick={() => setShowEdit(true)}>Edit Party</button>}

        </div>
      )}
      <p className='partyName'>
        Name:
        {' '}
        {party.name}
      </p>
      <p className='partyLeader'>
        Leader:
        {' '}
        {party.leader.username}
      </p>
      <p className='partyMembers'>
        Members:
      </p>
      {party.members.map(member => (
        <span className='partyMember' key={member.id}>
          {member.username}
          {' '}
          {member.id === sessionUser.id ? '(yourself) ' : ''}
        </span>
      ))}
    </div>
  );
};

export default Party;
