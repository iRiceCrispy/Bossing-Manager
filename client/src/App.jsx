import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { restoreUser } from './store/session';
import { loadUsers } from './store/users';
import MainWrapper from './components/MainWrapper';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

const App = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state => state.session.user);

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
        <Route exact path='/login'>
          <Auth type='login' />
        </Route>
        <Route exact path='/signup'>
          <Auth type='signup' />
        </Route>
        <MainWrapper>
          <Route exact path='/'>
            {user ? <Dashboard /> : 'HELLO'}
          </Route>
        </MainWrapper>
      </Switch>
    </div>
  );
};

export default App;
