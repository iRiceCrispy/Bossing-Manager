import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadParties } from '../../store/parties';
import { loadDrops } from '../../store/drops';
import Parties from '../Parties';
import Drops from '../Drops';
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
      <Parties />
      <Drops />
    </div>
  );
};

export default Dashboard;
