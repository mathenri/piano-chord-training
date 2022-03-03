import { Link } from "react-router-dom";
import {useState,  useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

export default function Stats() {
  const [countByDay, setCountByDay] = useState([])
  const [countByExtension, setCountByExtension] = useState([])
  
  useEffect(() => getStatsFromServer(), [])

  function getStatsFromServer() {
    // fetch count_by_day data
    fetch(process.env.REACT_APP_BACKEND_URL_STATS + "/count_by_day", {
      method: "GET",
      headers: {
        'X-Auth-Token': process.env.REACT_APP_BACKEND_AUTH_TOKEN // Note: this will be visible to browser users
      }
    })
    .then(response => response.json())
    .then(data => {
      setCountByDay(data)
    })
    .catch(err => console.log(err))

    // fetch count_by_extension data
    fetch(process.env.REACT_APP_BACKEND_URL_STATS + "/count_by_extension", {
      method: "GET",
      headers: {
        'X-Auth-Token': process.env.REACT_APP_BACKEND_AUTH_TOKEN // Note: this will be visible to browser users
      }
    })
    .then(response => response.json())
    .then(data => {
      setCountByExtension(data)
    })
    .catch(err => console.log(err))
  }

  function getChartData(inputData, title, labelFieldName) {
    const labels = inputData.map(d => d[labelFieldName])
    const data = inputData.map(d => d.count)

    return {
      labels,
      datasets: [
        {
          label: title,
          backgroundColor: 'rgba(75,192,192,1)',
          data
        }
      ]
    }
  }

  return (
    <main>
      <h2>Stats</h2>
      <Bar data={getChartData(countByDay, "Count by day", "day")} height={400}/>
      <Bar data={getChartData(countByExtension, "Count by extension", "chord_extension")} height={400}/>
      <nav>
        <Link to="/piano-chord-training">Piano</Link> |{" "}
        <Link to="/chord-progressions">Chord Progressions</Link> |{" "}
        <Link to="/stats">Stats</Link>
      </nav>
    </main>
  );
}