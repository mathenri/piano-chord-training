import {useState,  useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

export default function Stats() {
  const [countByDay, setCountByDay] = useState([])
  const [countByExtension, setCountByExtension] = useState([])
  const [durationByExtension, setDurationByExtension] = useState([])
  
  useEffect(() => getStatsFromServer(), [])

  /* Fetches statistics data from backend server */
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

    // fetch duration_by_extension data
    fetch(process.env.REACT_APP_BACKEND_URL_STATS + "/duration_by_extension", {
      method: "GET",
      headers: {
        'X-Auth-Token': process.env.REACT_APP_BACKEND_AUTH_TOKEN // Note: this will be visible to browser users
      }
    })
    .then(response => response.json())
    //.then(data => data.map(d => d.avg_duration / 1000))
    .then(data => {
      console.log(data)
      setDurationByExtension(data)
    })
    .catch(err => console.log(err))
  }

  /* Transform statistics data from server to an chart input data */
  function getChartData(inputData, title, labelFieldName, valueFieldName) {
    const labels = inputData.map(d => d[labelFieldName])
    const data = inputData.map(d => d[valueFieldName])

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
      <Bar data={getChartData(countByDay, "Count by day", "day", "count")} height={400}/>
      <Bar data={getChartData(countByExtension, "Count by extension", "chord_extension", "count")} height={400}/>
      <Bar data={getChartData(durationByExtension, "Duration by extension", "chord_extension", "avg_duration")} height={400}/>
    </main>
  );
}