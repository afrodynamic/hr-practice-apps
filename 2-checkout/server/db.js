const mysql = require('mysql2');
const Promise = require('bluebird');

// Configure process.env variables in ../.env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

const dbSessionTableQuery =
  `CREATE TABLE IF NOT EXISTS sessions (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  checkout_data JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

db.connectAsync()
  .then(() => console.log(`Connected to MySQL as id: ${db.threadId}`))
  .then(() =>
    // Expand this table definition as needed:
    db.queryAsync(dbSessionTableQuery))
  .catch((err) => console.log(err));

module.exports = db;
