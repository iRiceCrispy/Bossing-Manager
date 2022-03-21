import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadParties } from '../../store/parties';
import { loadDrops } from '../../store/drops';
import Parties from '../Parties';
import Drops from '../Drops';

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
    <main>
      <Parties />
      <Drops />
    </main>
  );
};

export default Dashboard;
