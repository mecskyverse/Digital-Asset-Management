import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './redux/store'
import { Analytics } from '@vercel/analytics/react';
import { inject } from '@vercel/analytics';

import App from './App.jsx'
import '../src/index.css'

inject();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>

      <App />
      <Analytics />
    </Provider>
  </React.StrictMode>,
)
