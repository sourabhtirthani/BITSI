const { Client } = require('pg'); // Import pg Client

const client = new Client({
  user: 'yourUsername',
  host: 'yourHost',
  database: 'yourDatabase',
  password: 'yourPassword',
  port: 5432, // Default PostgreSQL port
});

const insertMultipleCurrencies = async (currencies) => {
  try {
    // Connect to the database
    await client.connect();
    
    // SQL query to insert multiple records
    const query = `
      INSERT INTO currencies (currency, price)
      VALUES
        ($1, $2),
        ($3, $4),
        ($5, $6)
      RETURNING *`; // Add more pairs of ($X, $Y) for more rows
    const values = [
      ...currencies.flatMap((currency) => [currency.currency, currency.price])
    ];
    
    const res = await client.query(query, values);
    
    console.log('Currencies inserted:', res.rows);
  } catch (err) {
    console.error('Error inserting currencies:', err.stack);
  } finally {
    // Close the database connection
    await client.end();
  }
};

// Example usage:
const currenciesToInsert = [
  { currency: 'USD', price: 1.0 },
  { currency: 'EUR', price: 0.9 },
  { currency: 'BTC', price: 0.000025 }
];

insertMultipleCurrencies(currenciesToInsert);
