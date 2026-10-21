import { ChartLineLinear } from "./components/chart.js";
import React from 'react'

export default function Root() {
  return (
    <main className="app-shell">
      <header className="page-header">
        <p className="eyebrow">IOT LIVE MONITORING</p>
        <h1>67070234's Sensor dashboard</h1>
        <p className="page-intro">
          Live temperature and humidity readings from the simulated DHT11 sensor.
        </p>
      </header>
      <ChartLineLinear />
      <footer className="page-footer">Sensor data refreshes automatically.</footer>
    </main>
  );
}