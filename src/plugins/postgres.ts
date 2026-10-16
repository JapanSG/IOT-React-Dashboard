import fp from 'fastify-plugin'
import postgres from '@fastify/postgres'

export default fp(async function (fastify, opts) {
    fastify.register(postgres, {
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        database: process.env.POSTGRES_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD
    })
});