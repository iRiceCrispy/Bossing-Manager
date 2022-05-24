import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import socket from './socket';
import { fetchUsers } from './store/users';
import { fetchDrops } from './store/drops';
import { restoreSession } from './store/session';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Splash from './components/Splash';

const App = () => {
  const dispatch = useDispatch();
  document.addEventListener('keydown', (e) => {
    if (e.target.nodeName === 'INPUT' && e.key === 'Enter') e.preventDefault();
  });

  useEffect(() => {
    (async () => {
      await dispatch(restoreSession());
      await dispatch(fetchUsers());
    })();
  }, [dispatch]);

  socket.on('userStatus', () => {
    dispatch(fetchUsers());
  });

  socket.on('updateDrops', () => {
    console.log('hiiiiiiiiiii');
    dispatch(fetchDrops());
  });

  return (
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
