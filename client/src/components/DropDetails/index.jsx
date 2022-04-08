import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSelected } from '../../context/SelectedContext';
import Modal from '../Modal';
import DropForm from '../Forms/DropForm';
import SaleForm from '../Forms/SaleForm';
import { removeDrop } from '../../store/drops';
import bossList from '../../util/bossList.json';
import itemList from '../../util/itemList.json';
import './DropDetails.css';

const DropDetails = () => {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const [showSale, setShowSale] = useState(false);
  const { selectedDrop, setSelectedDrop } = useSelected();
  const sessionUser = useSelector(state => state.session.user);
  const drop = useSelector(state => state.drops[selectedDrop]);

  if (!drop) return <div id='notFound'>The drop you are looking for has either been deleted, or does not exist.</div>;

  const { party: { leader }, bossName, itemName, sold } = drop;
  const isLeader = leader.id === sessionUser.id;
  const members = drop.members
    .map(member => member.user)
    .sort((a, b) => (b.id === sessionUser.id) - (a.id === sessionUser.id));

  const boss = bossList[bossName];
  const item = itemList[itemName];

  const deleteDrop = () => {
    dispatch(removeDrop(drop.id));
    setSelectedDrop('');
  };

  return (
    <div className='dropDetails' key={drop.id}>
      <div className='details'>
        <p className='bossName'>
          {boss.name}
          <span className='isSold'>{sold ? '[Sold]' : '[Pending]'}</span>
          {!sold && (
          <button
            className='btn transparent'
            type='button'
            onClick={() => setShowSale(true)}
          >
            Mark as Sold
          </button>
          )}
          <img className='bossImg' src={boss.image} alt='' />
        </p>
        <p className='itemName'>
          {item.name}
          <img className='itemImg' src={item.image} alt='' />
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
        <img className='screenshot' src={drop.image} alt='' />
      </div>
      {isLeader && (
        <>
          <div className='buttons'>
            <button className='btn filled' type='button' onClick={() => setShowEdit(true)}>Edit Drop</button>
            <button className='btn filled' type='button' onClick={deleteDrop}>Delete Drop</button>
          </div>
          {showEdit && (
            <Modal showModal={setShowEdit}>
              <DropForm showForm={setShowEdit} drop={drop} edit />
            </Modal>
          )}
          {showSale && (
            <Modal showModal={setShowSale}>
              <SaleForm setShowForm={setShowSale} drop={drop} />
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default DropDetails;
