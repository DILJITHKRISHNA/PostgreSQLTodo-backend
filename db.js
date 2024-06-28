const Pool = require('pg').Pool;
const env = require('dotenv')
env.config()

const pool = new Pool({
    // user: 'postgres',
    // password: 'pg123',
    // host: 'localhost',
    // port: 5432,
    // database: "postgrestodo"
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

module.exports = pool