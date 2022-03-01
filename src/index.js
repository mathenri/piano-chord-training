import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import Stats from "./routes/stats";
import ChordProgressions from "./routes/chord-progressions";
import { CookiesProvider } from "react-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="piano-chord-training" element={<App />} />
          <Route path="chord-progressions" element={<ChordProgressions />} />
          <Route path="stats" element={<Stats />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
