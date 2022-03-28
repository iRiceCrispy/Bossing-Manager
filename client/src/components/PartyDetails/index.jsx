import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSelected } from '../../context/SelectedContext';
import Modal from '../Modal';
import PartyForm from '../Forms/PartyForm';
import DropForm from '../Forms/DropForm';
import { removeParty } from '../../store/parties';
import './PartyDetails.css';

const PartyDetails = () => {
  const dispatch = useDispatch();
  const { selectedParty, setSelectedParty, setSelectedDrop } = useSelected();
  const [showEdit, setShowEdit] = useState(false);
  const [showDrop, setShowDrop] = useState(false);
  const party = useSelector(state => state.parties[selectedParty]);
  const sessionUser = useSelector(state => state.session.user);
  const drops = Object.values(useSelector(state => state.drops))
    .filter(drop => drop.party.id === party?.id);

  if (!party) return <div id='notFound'>The party you are looking for has either been deleted, or does not exist.</div>;

  const { name, leader, members } = party;
  const isLeader = leader.id === sessionUser.id;
  members.sort((a, b) => (b.id === sessionUser.id) - (a.id === sessionUser.id));

  const deleteParty = () => {
    dispatch(removeParty(party.id));
    setSelectedParty('');
  };

  return (
    <div className='partyDetails'>
      <div className='details'>
        <h3 className='partyName'>
          {name}
        </h3>
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
          <button className='btn filled delete' type='button' onClick={deleteParty}>Delete party</button>
          {showDrop
            ? (
              <Modal showModal={setShowDrop}>
                <DropForm showForm={setShowDrop} party={party} />
              </Modal>
            )
            : <button className='btn filled add' type='button' onClick={() => setShowDrop(true)}>Add a drop</button>}
        </div>
      )}
      <div className='dropListContainer'>
        <p className='heading'>Drops</p>
        <div className='dropList'>
          {drops.map(drop => (
            <div className='drop' key={drop.id} onClick={() => setSelectedDrop(drop.id)}>
              <p className='bossName'>{drop.bossName}</p>
              <p className='itemName'>{drop.itemName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartyDetails;
