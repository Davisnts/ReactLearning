import React from 'react';
import ReactDOM from 'react-dom/client';
import './global/global-styles.css';
import { Home } from './templates/home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home propzinha='prop' />
  </React.StrictMode>
);
 