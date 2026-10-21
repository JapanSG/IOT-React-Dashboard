import React, { useEffect, useState } from "react";

interface LogProps {
  type : string
  id : number
  value: number
  created_at: string
}

interface LogsProps {
  timeProp : number
  minuteProp: number
}

interface FetchShape {
  id : number
  value : number
  created_at: string
}

function LogEntry({ type, id, value, created_at} : LogProps) {
  let unit;
  if (type == "temperature") {
    unit = "°C"
  }
  else if (type == "humidity") {
    unit = "%"
  }
  return (
    <div>
      <p>Type: {type}</p>
      <p>ID: {id}</p>
      <p>Value: {value} {unit}</p>
      <p>CreatedAt: {created_at}</p>
    </div>
  )
}

export default function Logs({timeProp, minuteProp} : LogsProps) {
  const [time, setTime] = useState(timeProp);
  const [lastMinutes, setLastMinutes] = useState(minuteProp);
  // setTime(timeProp);
  // setLastMinutes(minuteProp);
  const [temps, setTemps] = useState(new Array<FetchShape>());
  const [humids, setHumids] = useState(new Array<FetchShape>());
  const fetchTemps = async () => {
    try {
      const response = await fetch("/api/v1/temp?" + new URLSearchParams({minute : lastMinutes.toString()})
      , {headers : new Headers({
        'Authorization': 'Bearer ',
        'Content-Type': 'application/x-www-form-urlencoded'
        })
      });
      const data = await response.json();
      setTemps(data);
    } catch (error) {
      console.error(error);
    }
  }
  const fetchHumids = async () => {
    try {
      const response = await fetch("/api/v1/humidity?" + new URLSearchParams({minute : lastMinutes.toString()}));
      const data = await response.json();
      setHumids(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchTemps();
    fetchHumids();
    const tempInterval = setInterval(fetchTemps, time);
    const humidInterval = setInterval(fetchHumids, time);
    return () => {
      clearInterval(tempInterval); 
      clearInterval(humidInterval);
    };
  }, []);
  return (
    <div>
      <p>{lastMinutes}, {time}</p>
      <div>
        <h3>Temperature Logs</h3>
        <div>
          {temps.map((item) => {
            return <LogEntry key={item.id} type="temperature" id={item.id} value={item.value} created_at={item.created_at}></LogEntry>;
          })}
        </div>
      </div>
      <div>
        <h3>Humidity Logs</h3>
        <div>
          {humids.map((item) => {
            return <LogEntry key={item.id} type="humidity" id={item.id} value={item.value} created_at={item.created_at}></LogEntry>;
          })}
        </div>
      </div>
    </div>
  )
}