// // import pkg from 'pg';
// // import dotenv from 'dotenv'

// // const { Client } = pkg;
// // dotenv.config();


// // const client = new Client({
// //   connectionString: process.env.DATABASE_URL,
// // });


// // client.connect()
// //   .then(() => console.log('Connected to the database'))
// //   .catch(err => console.error('Connection error', err.stack));

// // export default client;

// import pg from 'pg';
// import dotenv from 'dotenv';

// dotenv.config();

// const { Pool } = pg;
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   idleTimeoutMillis: 30000,
//   max: 20,
//   connectionTimeoutMillis: 100000,
// });


// pool.on('error', (err, client) => {
//   console.error('Unexpected error on idle client', err);
//   // process.exit(-1);
// });

// export default pool;

import pkg from 'pg';
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg; // Destructure Pool from the default export

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;

