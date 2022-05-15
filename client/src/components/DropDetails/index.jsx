import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteDrop, deleteSale, payMember, unpayMember, dropsSelectors } from '../../store/drops';
import { getSessionUser } from '../../store/session';
import Modal from '../Modal';
import SaleForm from '../Forms/SaleForm';
import bossList from '../../util/bossList.json';
import itemList from '../../util/itemList.json';
import './DropDetails.scss';

const DropDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [showSale, setShowSale] = useState(false);
  const sessionUser = useSelector(getSessionUser);
  const drop = useSelector(state => dropsSelectors.selectById(state, id));

  if (!drop) return <div id="notFound">The drop you are looking for has either been deleted, or does not exist.</div>;

  const { party: { leader }, bossName, itemName, sold } = drop;
  const isLeader = leader.id === sessionUser.id;
  const members = drop.members
    .map(member => member)
    .sort((a, b) => (b.user.id === sessionUser.id) - (a.user.id === sessionUser.id));

  const boss = bossList[bossName];
  const item = itemList[itemName];

  const deleteDropEvent = () => {
    dispatch(deleteDrop(drop.id));
    navigate('/dashboard/drops');
  };

  const handlePayment = (member) => {
    if (member.isPaid) {
      dispatch(unpayMember({ dropId: drop.id, memberId: member.user.id }));
    }
    else {
      dispatch(payMember({ dropId: drop.id, memberId: member.user.id }));
    }
  };

  return (
    <div className="dropDetails" key={drop.id}>
      <div className="details">
        <div className="info">
          <p className="bossName">
            {boss.name}
            <span className="isSold">{sold ? '[Sold]' : '[Pending]'}</span>
            {sold ? (
              <button
                className="btn transparent"
                type="button"
                onClick={() => dispatch(deleteSale(drop.id))}
              >
                Undo
              </button>
            ) : (
              <button
                className="btn transparent"
                type="button"
                onClick={() => setShowSale(true)}
              >
                Mark as Sold
              </button>
            )}
            <img className="bossImg" src={boss.image} alt="" />
          </p>
          <p className="itemName">
            {item.name}
            <img className="itemImg" src={item.image} alt="" />
          </p>
          <div className="partyMembers">
            <p>Members:</p>
            {members.map(member => (
              <div className="partyMember" key={member.id}>
                <div className="status">
                  {member.isPaid
                     && <FontAwesomeIcon icon="fa-solid fa-check" />}
                </div>
                <p className="username" key={member.user.id}>
                  {member.id === sessionUser.id ? 'You' : member.user.username}
                  {' '}
                </p>
                {drop.sold && (
                  <button
                    className="btn transparent payButton"
                    type="button"
                    onClick={() => handlePayment(member)}
                  >
                    {member.isPaid ? 'Cancel' : 'Pay member'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <img className="screenshot" src={drop.image} alt="" />
        {sold && (
        <div className="sale">
          <p className="price">
            {drop.price.toLocaleString()}
          </p>
          <p className="split">{Math.floor(drop.price / members.length).toLocaleString()}</p>
          <img className="saleConfirmation" src={drop.saleImage} alt="" />
        </div>
        )}
      </div>
      {showSale && (
        <Modal showModal={setShowSale}>
          <SaleForm setShowForm={setShowSale} drop={drop} />
        </Modal>
      )}
      {isLeader && (
      <div className="modifyingButtons">
        <Link className="btn transparent edit" to="edit">
          <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
        </Link>
        <button className="btn transparent delete" type="button" onClick={deleteDropEvent}>
          <FontAwesomeIcon icon="fa-solid fa-trash-can" />
        </button>
      </div>
      )}
    </div>
  );
};

export default DropDetails;
