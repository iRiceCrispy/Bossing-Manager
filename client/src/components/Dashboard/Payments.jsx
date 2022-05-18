import React from 'react';
import { useSelector } from 'react-redux';
import { dropsSelectors } from '../../store/drops';
import { getSessionUser } from '../../store/session';
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
          <p>Pending</p>
          {pendingPayments.map(drop => (
            <div className="payment" key={drop.id}>
              {drop.itemName}
              {drop.split.toLocaleString()}
            </div>
          ))}
        </div>
        <div className="completed">
          <p>Completed</p>
          {completedPayments.map(drop => (
            <div className="payment" key={drop.id}>
              {drop.itemName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Payments;
