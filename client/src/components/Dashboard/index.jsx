import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { loadParties } from '../../store/parties';
import { loadDrops } from '../../store/drops';
import { useSelected } from '../../context/SelectedContext';
import Parties from './Parties';
import Drops from './Drops';
import PartyDetails from '../PartyDetails';
import DropDetails from '../DropDetails';
import './Dashboard.scss';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { selectedParty, setSelectedParty, selectedDrop, setSelectedDrop } = useSelected();
  const partySelected = Boolean(selectedParty);
  const dropSelected = Boolean(selectedDrop);

  useEffect(() => {
    (async () => {
      await dispatch(loadParties());
      await dispatch(loadDrops());

      setIsLoaded(true);
    })();
  }, [dispatch]);

  let content;

  if (dropSelected) {
    content = <DropDetails />;
  }
  else if (partySelected) {
    content = <PartyDetails />;
  }
  else {
    content = (
      <div id='notFound'>
        No content yet. Will add in the future once more features has been implemented.
        <br />
        <br />
        For now, browse the left sidebar to view parties and their corresponding drops.
      </div>
    );
  }

  const showBack = partySelected || dropSelected;

  const goBack = () => {
    if (dropSelected) setSelectedDrop('');
    else if (partySelected) setSelectedParty('');
  };

  return isLoaded && (
    <div id='dashboard'>
      <nav className='sidebar'>
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
          <Drops />
        ) : (
          <Parties />
        )}
      </nav>
      <div className='content'>
        {content}
      </div>
    </div>
  );
};

export default Dashboard;
