import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadParties } from '../../store/parties';
import { loadDrops } from '../../store/drops';
import Parties from './Parties';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

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
        <Parties />
      </nav>
      <div className='content'>
        Hello
      </div>
    </div>
  );
};

export default Dashboard;
