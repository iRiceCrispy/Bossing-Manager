import React from 'react';
import { useSelector } from 'react-redux';
import { getSessionUser } from '../../store/session';
import { partiesSelectors } from '../../store/parties';
import { dropsSelectors } from '../../store/drops';
import './Main.scss';

const Main = () => {
  const sessionUser = useSelector(getSessionUser);
  const parties = useSelector(partiesSelectors.selectAll);
  const drops = useSelector(dropsSelectors.selectAll);

  const [partiesL] = parties.reduce(([l, m], party) => (
    party.leader.id === sessionUser.id ? [[...l, party], m] : [l, [...m, party]]
  ), [[], []]);

  const [sold, pending] = drops.reduce(([s, p], drop) => (
    drop.sold === true ? [[...s, drop], p] : [s, [...p, drop]]
  ), [[], []]);

  const earnings = drops.reduce((sum, drop) => sum + (drop.price || 0), 0).toLocaleString();

  return (
    <div id="main">
      <h2>Dashboard</h2>
      <div className="modules">
        <section className="parties">
          <div className="header">
            <h3 className="heading">Parties</h3>
          </div>
          <div className="content">
            <p>
              Currently in
              {' '}
              <strong>{parties.length}</strong>
              {' '}
              parties
            </p>
            <p>
              Managing
              {' '}
              <strong>{partiesL.length}</strong>
              {' '}
              parties
            </p>
          </div>
        </section>
        <section className="drops">
          <div className="header">
            <h3 className="heading">Drops</h3>
          </div>
          <div className="content">
            <div>
              <p>
                Total drops:
                {' '}
                <strong>{drops.length}</strong>
              </p>
              <p>
                Sold:
                {' '}
                <strong>{sold.length}</strong>
              </p>
              {' '}
              <p>
                Pending:
                {' '}
                <strong>{pending.length}</strong>
              </p>
            </div>
          </div>
        </section>
        <section className="payments">
          <div className="header">
            <h3 className="heading">Payments</h3>
          </div>
          <div className="content">
            <p>
              Total earned:
              {' '}
              {earnings}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Main;
