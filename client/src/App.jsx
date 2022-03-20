import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { restoreUser } from './store/session';
import { loadUsers } from './store/users';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
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
      <Navigation />
      <Switch>
        <Route exact path='/'>
          {user ? <Dashboard /> : 'HELLO'}
        </Route>
        <Route exact path='/login'>
          <LoginFormPage />
        </Route>
        <Route exact path='/signup'>
          <SignupFormPage />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
