import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { restoreUser } from './store/session';
import { loadUsers } from './store/users';
import SelectedProvider from './context/SelectedContext';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Splash from './components/Splash';

const App = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state => state.session.user);

  document.addEventListener('keydown', e => {
    if (e.target.nodeName === 'INPUT' && e.key === 'Enter') e.preventDefault();
  });

  useEffect(() => {
    (async () => {
      await dispatch(restoreUser());
      await dispatch(loadUsers());
      setIsLoaded(true);
    })();
  }, [dispatch]);

  return isLoaded && (
    <div className='app'>
      <Switch>
        <Route exact path='/'>
          <Splash />
        </Route>
        <Route exact path='/login'>
          <Auth type='login' />
        </Route>
        <Route exact path='/signup'>
          <Auth type='signup' />
        </Route>
        <Route path='/dashboard'>
          <SelectedProvider>
            <Dashboard />
          </SelectedProvider>
        </Route>
        <Route>
          <Redirect to='/' />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
