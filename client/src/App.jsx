import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { restoreUser } from './store/session';
import { loadUsers } from './store/users';
import MainWrapper from './components/MainWrapper';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
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
      <MainWrapper>
        <Switch>
          <Route exact path='/'>
            {user ? <Dashboard /> : 'HELLO'}
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/signup'>
            <Signup />
          </Route>
        </Switch>
      </MainWrapper>
    </div>
  );
};

export default App;
