import { createConnection, OkPacket } from 'mysql2/promise';

const dbSessionTableQuery = `
  CREATE TABLE IF NOT EXISTS sessions (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    checkout_data JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

const dbConnection = async() => {
  const connection = await createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'checkout',
  });

  connection.connect()
    .then(() => console.log(`Connected to MySQL as id: ${connection.threadId}`))
    .then(() => connection.query<OkPacket>(dbSessionTableQuery))
    .then(([result]) => console.log(`Session table created, ${result.affectedRows} rows affected.`));

  return connection;
};

export default dbConnection;
