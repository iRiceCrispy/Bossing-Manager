import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Splash from './components/Splash';

const App = () => {
  document.addEventListener('keydown', (e) => {
    if (e.target.nodeName === 'INPUT' && e.key === 'Enter') e.preventDefault();
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
