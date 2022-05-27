import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { restoreSession } from './store/session';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Splash from './components/Splash';

const App = () => {
  const dispatch = useDispatch();
  // document.addEventListener('keydown', (e) => {
  //   if (e.target.nodeName === 'INPUT' && e.key === 'Enter') e.preventDefault();
  // });

  useEffect(() => {
    axios.defaults.headers.common = {
      'Content-Type': 'application/json',
      'XSRF-Token': Cookies.get('XSRF-TOKEN'),
    };

    dispatch(restoreSession());
  }, [dispatch]);

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
