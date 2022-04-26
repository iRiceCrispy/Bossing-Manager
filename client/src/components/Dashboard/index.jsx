import React, { useEffect, useState } from 'react';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadParties } from '../../store/parties';
import { loadDrops } from '../../store/drops';
import Navigation from '../Navigation';
import './Dashboard.scss';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { path, url } = useRouteMatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(loadParties());
      await dispatch(loadDrops());

      setIsLoaded(true);
    })();
  }, [dispatch]);

  return isLoaded && (
    <div id='dashboard'>
      <nav className='sidebar'>
        <ul>
          <li>
            <NavLink to={url}>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to={`${url}/parties`}>Parties</NavLink>
          </li>
          <li>
            <NavLink to={`${url}/drops`}>Drops</NavLink>
          </li>
        </ul>
      </nav>
      <div className='main'>
        <Navigation />
        <div className='content'>
          <Switch>
            <Route exact path={path}>
              Dashboard
            </Route>
            <Route exact path={`${path}/parties`}>
              Parties
            </Route>
            <Route exact path={`${path}/drops`}>
              Drops
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
