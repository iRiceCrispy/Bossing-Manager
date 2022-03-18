import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadParties } from '../../store/parties';
import Parties from '../Parties';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(loadParties());

      setIsLoaded(true);
    })();
  }, [dispatch]);

  return isLoaded && (
    <main>
      <Parties />
    </main>
  );
};

export default Dashboard;
