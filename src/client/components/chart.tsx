import React, { useEffect, useState } from "react";

interface Reading {
  id: number;
  value: number;
  created_at: string;
}

interface MetricChartProps {
  title: string;
  unit: string;
  readings: Reading[];
  minimum: number;
  maximum: number;
}

const chartWidth = 640;
const chartHeight = 240;
const plot = { left: 52, right: 620, top: 16, bottom: 204 };

async function fetchReadings(endpoint: string): Promise<Reading[]> {
  const response = await fetch(`${endpoint}?${new URLSearchParams({ minute: "10" })}`);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data: unknown = await response.json();
  if (
    !Array.isArray(data) ||
    !data.every(
      (item): item is Reading =>
        typeof item?.id === "number" &&
        typeof item?.value === "number" &&
        typeof item?.created_at === "string",
    )
  ) {
    throw new Error("The server returned readings in an unexpected format");
  }

  return data
    .sort((first, second) => Date.parse(first.created_at) - Date.parse(second.created_at))
    .slice(-30);
}

function MetricChart({ title, unit, readings, minimum, maximum }: MetricChartProps) {
  const x = (index: number) =>
    readings.length === 1
      ? (plot.left + plot.right) / 2
      : plot.left + (index / (readings.length - 1)) * (plot.right - plot.left);
  const y = (value: number) =>
    plot.bottom - ((value - minimum) / (maximum - minimum)) * (plot.bottom - plot.top);
  const path = readings
    .map((reading, index) => `${index === 0 ? "M" : "L"} ${x(index)} ${y(reading.value)}`)
    .join(" ");
  const latest = readings.at(-1);

  return (
    <article className="metric-card">
      <div className="metric-card__heading">
        <div>
          <h2>{title}</h2>
          <p className="metric-card__caption">Latest 30 readings</p>
        </div>
        <p className="metric-card__value">
          {latest ? `${latest.value.toFixed(1)}${unit}` : "--"}
        </p>
      </div>
      {readings.length ? (
        <div className="chart-scroll">
          <svg
            className="metric-chart"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            role="img"
            aria-label={`${title} readings over time`}
          >
            {[0, 1, 2, 3].map((step) => {
              const tickY = plot.top + (step / 3) * (plot.bottom - plot.top);
              const tickValue = maximum - (step / 3) * (maximum - minimum);
              return (
                <g key={step}>
                  <line className="chart-gridline" x1={plot.left} x2={plot.right} y1={tickY} y2={tickY} />
                  <text className="chart-axis-label" x={plot.left - 10} y={tickY + 4} textAnchor="end">
                    {tickValue.toFixed(1)}
                  </text>
                </g>
              );
            })}
            <path className="chart-line" d={path} />
            {latest && (
              <circle
                className="chart-point"
                cx={x(readings.length - 1)}
                cy={y(latest.value)}
                r="4"
              />
            )}
            <text className="chart-axis-label" x={plot.left} y={chartHeight - 8}>
              {new Date(readings[0]!.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </text>
            <text className="chart-axis-label" x={plot.right} y={chartHeight - 8} textAnchor="end">
              {new Date(latest!.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </text>
          </svg>
        </div>
      ) : (
        <p className="empty-state">Waiting for readings…</p>
      )}
    </article>
  );
}

export function ChartLineLinear() {
  const [temperatures, setTemperatures] = useState<Reading[]>([]);
  const [humidity, setHumidity] = useState<Reading[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    let active = true;
    let timeout: ReturnType<typeof setTimeout>;

    const poll = async () => {
      try {
        const [temperatureReadings, humidityReadings] = await Promise.all([
          fetchReadings("/api/v1/temp"),
          fetchReadings("/api/v1/humidity"),
        ]);
        if (active) {
          setTemperatures(temperatureReadings);
          setHumidity(humidityReadings);
          setLastUpdated(new Date());
          setError(null);
        }
      } catch (fetchError) {
        if (active) {
          setError(fetchError instanceof Error ? fetchError.message : "Unable to load sensor readings");
        }
      } finally {
        if (active) {
          timeout = setTimeout(poll, 5000);
        }
      }
    };

    void poll();
    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="dashboard" aria-label="Sensor readings">
      <div className="dashboard__status" aria-live="polite">
        <span className={`status-dot${error ? " status-dot--error" : ""}`} />
        {error ? (
          <span>Unable to refresh readings: {error}</span>
        ) : lastUpdated ? (
          <span>Updated {lastUpdated.toLocaleTimeString()}</span>
        ) : (
          <span>Connecting to sensors…</span>
        )}
        <span className="dashboard__interval">Refreshes every 5 seconds</span>
      </div>
      <div className="metric-grid">
        <MetricChart title="Temperature" unit="°C" readings={temperatures} minimum={23} maximum={40} />
        <MetricChart title="Humidity" unit="%" readings={humidity} minimum={15} maximum={95} />
      </div>
    </section>
  );
}
