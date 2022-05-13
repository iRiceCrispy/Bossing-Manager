import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { restoreUser } from './store/session';
import { loadUsers } from './store/users';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Splash from './components/Splash';

const App = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  document.addEventListener('keydown', (e) => {
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
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={<Splash />}
        />
        <Route
          path="/login"
          element={<Auth type="login" />}
        />
        <Route
          path="/signup"
          element={<Auth type="signup" />}
        />
        <Route
          path="/dashboard/*"
          element={<Dashboard />}
        />
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

export default App;
