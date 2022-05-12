import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import App from './App';
import configureStore from './store';
import { restoreCSRF } from './store/csrf';
import './index.css';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();
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
