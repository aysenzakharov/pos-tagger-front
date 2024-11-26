import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './i18n/config'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router";

import Home from './pages/Home';
import Welcome from './pages/Welcome';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
