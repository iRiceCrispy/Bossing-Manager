import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { restoreUser } from './store/session';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';

const App = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      await dispatch(restoreUser());
      setIsLoaded(true);
    })();
  }, [dispatch]);

  return isLoaded && (
    <div className='app'>
      <Navigation />
      <Switch>
        <Route exact path='/'>
          <Dashboard />
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
