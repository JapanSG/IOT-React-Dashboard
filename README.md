# IoT React Dashboard

A small full-stack IoT dashboard that displays simulated DHT11 temperature and humidity readings. The React single-page app plots the latest readings and polls the API every five seconds. Charts use fixed scales of **23–40 °C** and **15–95%**.

## Stack

- React and TypeScript, bundled with Vite
- Fastify API server
- PostgreSQL database with Drizzle ORM
- Simulated sensor that periodically submits readings

## Requirements

- Node.js and npm
- Docker, for the included PostgreSQL service (or another PostgreSQL instance)

## Getting started

1. Install dependencies:

   ```sh
   npm install
   ```

2. Start PostgreSQL using Docker Compose:

   ```sh
   docker compose up -d db
   ```

   The database is exposed at `localhost:8080`. The Compose configuration creates database `iot_dashboard` with username `admin` and password `password123`.

3. Create a `.env` file in the project root:

   ```dotenv
   DATABASE_URL=postgres://admin:password123@localhost:8080/iot_dashboard
   AUTH_TOKEN=replace-with-a-long-random-token
   HOST_URL=http://localhost:3000
   ```

   `DATABASE_URL` is used by Drizzle to connect to PostgreSQL. `AUTH_TOKEN` protects the sensor write endpoints. `HOST_URL` tells the simulator where to send readings. Keep real credentials private; do not commit `.env`.

4. Create and apply the database schema:

   ```sh
   npx drizzle-kit generate
   npx drizzle-kit migrate
   ```

5. Start the server and simulated device:

   ```sh
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000).

The simulator generates temperature values bounded between 23 and 40 °C and humidity values bounded between 15 and 95%. It submits readings for the dashboard to display.

## API

All endpoints are under `/api/v1`.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/temp?minute=10` | Read temperature history from the last `minute` minutes |
| `GET` | `/humidity?minute=10` | Read humidity history from the last `minute` minutes |
| `POST` | `/temp` | Submit a temperature reading |
| `POST` | `/humidity` | Submit a humidity reading |

The GET endpoints are public. POST endpoints require an `Authorization: Bearer <AUTH_TOKEN>` header.

Temperature request body:

```json
{
  "value": 28.5,
  "unit": "C"
}
```

The temperature unit can be `C` or `F`; Fahrenheit values are converted to Celsius before storage.

Humidity request body:

```json
{
  "value": 55
}
```

## Build and run

Build the TypeScript server and production client:

```sh
npm run build
```

Start the built server:

```sh
npm start
```

## Deploy to Vercel

Vercel uses `npm run build`, serves the generated `dist/client` bundle, and
the Vite framework preset, and routes `/api/*` requests through the Fastify
function. The preset is set explicitly because the project also has a Fastify
server entrypoint. The function includes the generated `dist` files so
`@fastify/vite` can load its production configuration. Set `DATABASE_URL` and
`AUTH_TOKEN` in the Vercel project environment variables. The simulator is not
started by the serverless function; sensor data must be provided by a persistent
device or another scheduled process.
