import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ChordProgressionTraining from "./ChordProgressionTraining.js"
import Stats from "./Stats.js"
import ChordTraining from "./ChordTraining.js"
import './App.css'

export default function App () {

  return (
    <Router>
      <div id="app">
        <Routes>
          <Route 
            exact path={process.env.REACT_APP_BASE_URL_PATH + "/chord-progression-training"}
            element={<ChordProgressionTraining />}
          >
          </Route>
          <Route
            exact path={process.env.REACT_APP_BASE_URL_PATH + "/stats"}
            element={<Stats />}
          >
          </Route>
          <Route 
            path={process.env.REACT_APP_BASE_URL_PATH + "/"}
            element={<ChordTraining />}
          >
          </Route>
        </Routes>
        <nav>
          <ul>
            <li>
              <Link to={process.env.REACT_APP_BASE_URL_PATH + "/"}>Chords</Link>
            </li>
            <li>
              <Link to={process.env.REACT_APP_BASE_URL_PATH + "/chord-progression-training"}>Chord progressions</Link>
            </li>
            <li>
              <Link to={process.env.REACT_APP_BASE_URL_PATH + "/stats"}>Stats</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
  );
}
