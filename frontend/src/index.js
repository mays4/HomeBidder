import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import PropertyProvider from './providers/PropertyProvider';

ReactDOM.render(
  <PropertyProvider>
    <App/>
    </PropertyProvider>,
  document.getElementById('root')
);

