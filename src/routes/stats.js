import { Link } from "react-router-dom";
import {useState,  useEffect } from 'react';

export default function Stats() {
  const [stats, setStats] = useState([])
  
  useEffect(() => getStats(), [])

  function getStats() {
    fetch(process.env.REACT_APP_BACKEND_URL, {
      method: "GET",
      headers: {
        'X-Auth-Token': process.env.REACT_APP_BACKEND_AUTH_TOKEN // Note: this will be visible to browser users
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setStats(data)
    })
    .catch(err => console.log(err))
  }

  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Stats</h2>
      <h3>Total guesses</h3>
      <p>{stats.length}</p>
      <h3>All guesses</h3>
      {stats.map((chord, i) => <p key={i}>{chord.chord_name} - {chord.created_at}</p>)}
      <nav>
        <Link to="/piano-chord-training">Piano</Link> |{" "}
        <Link to="/stats">Stats</Link>
      </nav>
    </main>
  );
}