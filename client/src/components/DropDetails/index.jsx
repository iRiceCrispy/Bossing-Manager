import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSelected } from '../../context/SelectedContext';
import Modal from '../Modal';
import DropForm from '../Forms/DropForm';
import SaleForm from '../Forms/SaleForm';
import { removeDrop, payMember, unpayMember } from '../../store/drops';
import bossList from '../../util/bossList.json';
import itemList from '../../util/itemList.json';
import './DropDetails.scss';

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
    .map(member => member)
    .sort((a, b) => (b.user.id === sessionUser.id) - (a.user.id === sessionUser.id));

  const boss = bossList[bossName];
  const item = itemList[itemName];

  const deleteDrop = () => {
    dispatch(removeDrop(drop.id));
    setSelectedDrop('');
  };

  const handlePayment = member => {
    if (member.isPaid) {
      dispatch(unpayMember(drop.id, member.user.id));
    }
    else {
      dispatch(payMember(drop.id, member.user.id));
    }
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
          <p className='partyMember' key={member.user.id}>
            {member.id === sessionUser.id ? 'You' : member.user.username}
            {' '}
          </p>
        ))}
        <img className='screenshot' src={drop.image} alt='' />
      </div>
      {isLeader && (
        <div className='buttons'>
          <button className='btn light' type='button' onClick={() => setShowEdit(true)}>Edit Drop</button>
          <button className='btn light' type='button' onClick={deleteDrop}>Delete Drop</button>
        </div>
      )}
      {sold && (
        <>
          <div className='sale'>
            <p>
              Sold For:
              {' '}
              {drop.price.toLocaleString()}
            </p>
            <img className='saleConfirmation' src={drop.saleImage} alt='' />
          </div>
          <div className='payments'>
            {members.map(member => (
              <div className='payment' key={member.user.id}>
                <p className='memberName'>{member.user.username}</p>
                <p className='amount'>{Math.floor(drop.price / members.length).toLocaleString()}</p>
                <button className='btn light' type='button' onClick={() => handlePayment(member)}>{member.isPaid ? 'Cancel' : 'Pay member'}</button>
              </div>
            ))}
          </div>
        </>
      )}
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
    </div>
  );
};

export default DropDetails;
