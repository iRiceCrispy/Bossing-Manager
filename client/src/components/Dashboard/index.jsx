import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { loadParties } from '../../store/parties';
import { loadDrops } from '../../store/drops';
import Parties from './Parties';
import Drops from './Drops';
import PartyDetails from '../PartyDetails';
import DropDetails from '../DropDetails';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedParty, setSelectedParty] = useState({});
  const [selectedDrop, setSelectedDrop] = useState({});
  const partySelected = Object.keys(selectedParty).length > 0;
  const dropSelected = Object.keys(selectedDrop).length > 0;

  useEffect(() => {
    (async () => {
      await dispatch(loadParties());
      await dispatch(loadDrops());

      setIsLoaded(true);
    })();
  }, [dispatch]);

  let content;

  if (dropSelected) {
    content = <DropDetails drop={selectedDrop} setDrop={setSelectedDrop} />;
  }
  else if (partySelected) {
    content = <PartyDetails party={selectedParty} setDrop={setSelectedDrop} />;
  }
  else content = 'Hello';

  const showBack = partySelected || dropSelected;

  const goBack = () => {
    if (dropSelected) setSelectedDrop({});
    else if (partySelected) setSelectedParty({});
  };

  return isLoaded && (
    <div className='dashboardContainer'>
      <nav className='leftSideBar'>
        {showBack && (
        <button
          className='btn transparent goBack'
          type='button'
          onClick={goBack}
        >
          <FontAwesomeIcon icon='fas fa-arrow-left' />
          {' '}
          Back
        </button>
        )}
        {dropSelected ? (
          <Drops
            party={selectedParty}
            setSelected={setSelectedDrop}
            selected={selectedDrop}
          />
        ) : (
          <Parties
            setSelected={setSelectedParty}
            setSelectedDrop={setSelectedDrop}
            selected={selectedParty}
          />
        )}
      </nav>
      <div className='content'>
        {content}
      </div>
    </div>
  );
};

export default Dashboard;
