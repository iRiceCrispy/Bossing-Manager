import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadParties } from '../../store/parties';
import { loadDrops } from '../../store/drops';
import Parties from './Parties';
import PartyDetails from '../PartyDetails';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    (async () => {
      await dispatch(loadParties());
      await dispatch(loadDrops());

      setIsLoaded(true);
    })();
  }, [dispatch]);

  return isLoaded && (
    <div className='dashboardContainer'>
      <nav>
        <Parties setSelected={setSelected} selected={selected} />
      </nav>
      <div className='content'>
        {Object.keys(selected).length > 0
          && <PartyDetails party={selected} />}
      </div>
    </div>
  );
};

export default Dashboard;
