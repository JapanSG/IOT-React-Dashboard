import React from "react"
import Logs from "./components/logs.js"

export function createApp() {
  return <>
    <h1>Thanakrit's IOT Dashboards</h1>
    <p>This website shows temperature and humidity readings which are measured from DHT11 (Simulated)</p>
    <h2>Temperatures</h2>
    <h2>Humidity</h2>
    <Logs minuteProp={60} timeProp={5}/>
  </>;
}