const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
  console.log("Connected...");

  db.query(
    `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      password VARCHAR(255),
      role ENUM('buyer', 'seller') NOT NULL
    )`,
    (err) => {
      if (err) console.error("Error creating users table:", err);
    }
  );

  db.query(
    `CREATE TABLE IF NOT EXISTS properties (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(100),
      price DECIMAL(10,2),
      location VARCHAR(255),
      image VARCHAR(255),
      seller_id INT,
      FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE
    )`,
    (err) => {
      if (err) console.error("Error creating properties table:", err);
    }
  );

  db.query(
    `CREATE TABLE IF NOT EXISTS messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      buyer_id INT,
      seller_id INT,
      property_id INT,
      message TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
    )`,
    (err) => {
      if (err) console.error("Error creating messages table:", err);
    }
  );

  db.query(
    `CREATE TABLE IF NOT EXISTS contacts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      buyer_id INT,
      seller_id INT,
      property_id INT,
      message TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
    )`,
    (err) => {
      if (err) console.error("Error creating contacts table:", err);
    }
  );  
});

module.exports = db;
