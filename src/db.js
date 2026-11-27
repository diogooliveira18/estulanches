const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'estu',
  password: process.env.DB_PASSWORD || 'estu123',
  database: process.env.DB_NAME || 'estulanches',
});

module.exports = pool;
