import { Link } from "react-router-dom";
import {useState,  useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

export default function Stats() {
  const [stats, setStats] = useState([])
  
  useEffect(() => getStatsFromServer(), [])

  function getStatsFromServer() {
    fetch(process.env.REACT_APP_BACKEND_URL_STATS + "/count_by_day", {
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

  function getChartData(inputData) {
    const labels = inputData.map(d => d.day)
    const data = inputData.map(d => d.count)

    return {
      labels,
      datasets: [
        {
          label: 'Count by day',
          backgroundColor: 'rgba(75,192,192,1)',
          data
        }
      ]
    }
  }

  return (
    <main>
      <h2>Stats</h2>
      <Bar data={getChartData(stats)} />
      <nav>
        <Link to="/piano-chord-training">Piano</Link> |{" "}
        <Link to="/chord-progressions">Chord Progressions</Link> |{" "}
        <Link to="/stats">Stats</Link>
      </nav>
    </main>
  );
}