import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  idleTimeoutMillis: 30000,
  max: 10,
  connectionTimeoutMillis: 100000,
});


pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  // process.exit(-1);
});

export default pool;