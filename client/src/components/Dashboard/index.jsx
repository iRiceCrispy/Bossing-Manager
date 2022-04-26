import React, { useEffect, useState } from 'react';
import { Link, NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadParties } from '../../store/parties';
import { loadDrops } from '../../store/drops';
import './Dashboard.scss';
import ProfileButton from '../ProfileButton';

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
        <div className='home'>
          <Link className='logo' type='button' to='/'>
            <img src='/favicon.ico' alt='favicon' />
            <span className='text'>Chaos Mano</span>
          </Link>
        </div>
        <ul className='menu'>
          <li>
            <NavLink
              className='menuItem'
              activeClassName='selected'
              exact
              to={url}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              className='menuItem'
              activeClassName='selected'
              to={`${url}/parties`}
            >
              Parties
            </NavLink>
          </li>
          <li>
            <NavLink
              className='menuItem'
              activeClassName='selected'
              to={`${url}/drops`}
            >
              Drops
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className='topbar'>
        <div className='menu'>
          <Link className='btn transparent menuItem' to={`${url}/parties/create`}>Create new party</Link>
        </div>
        <div className='auth'>
          <ProfileButton />
        </div>
      </div>
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
  );
};

export default Dashboard;
