import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { dropsSelectors } from '../../store/drops';
import { getSessionUser } from '../../store/session';
import items from '../../util/itemList.json';
import './Payments.scss';

const Payments = () => {
  const sessionUser = useSelector(getSessionUser);
  const drops = useSelector(dropsSelectors.selectAll);
  const payments = drops.filter(drop => drop.sold === true);

  const checkPayment = (payment) => {
    const user = payment.members.find(member => member.user.id === sessionUser.id);

    return user.isPaid ? 'paid' : 'pending';
  };

  const pendingPayments = payments.filter(payment => checkPayment(payment) === 'pending');
  const completedPayments = payments.filter(payment => checkPayment(payment) === 'paid');

  return (
    <div id="payments">
      <h2>Payments</h2>
      <div className="content">
        <div className="pending">
          <p className="heading">Pending</p>
          <ul className="payments">
            {pendingPayments.map((drop) => {
              const { id, itemName, split } = drop;
              const item = items[itemName];

              return (
                <li className="payment" key={drop.id}>
                  <Link to={`../drops/${id}`}>
                    <div className="itemName">
                      {itemName}
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="split">
                      {split.toLocaleString()}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="completed">
          <p className="heading">Completed</p>
          <ul className="payments">
            {completedPayments.map((drop) => {
              const { id, itemName, split } = drop;
              const item = items[itemName];

              return (
                <li className="payment" key={drop.id}>
                  <Link to={`../drops/${id}`}>
                    <div className="itemName">
                      {itemName}
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="split">
                      {split.toLocaleString()}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Payments;
