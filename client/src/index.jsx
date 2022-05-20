import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import axios from 'axios';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import App from './App';
import store from './store';
import { fetchUsers } from './store/users';
import { restoreSession } from './store/session';
import './index.css';

const socket = io('http://localhost:5000');

socket.on('connect', () => {
  console.log(socket.id);
});

store.dispatch(restoreSession());
store.dispatch(fetchUsers());

axios.defaults.headers.common = {
  'Content-Type': 'application/json',
  'XSRF-Token': Cookies.get('XSRF-TOKEN'),
};

if (process.env.NODE_ENV !== 'production') {
  axios.get('/api/csrf/restore');
}

const Root = () => (
  <ReduxProvider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReduxProvider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);

library.add(fas, far);
