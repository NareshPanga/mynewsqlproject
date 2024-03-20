# Database, table creation and API development in MySQL using Node JS

To create a database, tables, and write APIs to interact with them, you can follow these steps:

1. **Database Creation:**
    - Choose a relational database management system (RDBMS) like MySQL, PostgreSQL, or SQLite, or a NoSQL database like MongoDB, depending on your project requirements.
    - Install the chosen database system on your local machine or use a cloud-based service if preferred.
    - Create a new database using the RDBMS's CLI or GUI tools. For example, with MySQL, you can use the `CREATE DATABASE` command.
    - Design the database schema by identifying the tables and their relationships, attributes, and data types.
2. **Table Creation:**
    - For each table in your schema, define its structure using SQL `CREATE TABLE` statements.
    - Specify the columns, their data types, constraints (such as primary keys, foreign keys, unique constraints), and any default values.
    - Execute the SQL statements to create the tables within your database.

### **For Example:**

Let’s create a simple API with Node.js and Express.js to interact with a MySQL database. We'll create a basic "users" table and implement CRUD (Create, Read, Update, Delete) operations for managing user data.

First, make sure you have Node.js and MySQL installed on your system. Then, follow these steps:

**Execute Database Setup Commands in MySQL:**

- Open your MySQL terminal or client application (such as MySQL Workbench).
- Connect to your MySQL server.
- Create a new MySQL database named `example_db`.
- Create a `users` table with columns `id` (auto-increment, primary key), `username`, and `email`.

```sql
CREATE DATABASE example_db;

USE example_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);
```

**Project Setup:**

- Create a new directory for your project and navigate into it.
- Initialize a new Node.js project by running `npm init` and follow the prompts.
- Install necessary dependencies (`express`, `mysql`).

```bash
npm install express mysql
```

**API Implementation:**

- Create an `index.js` file and implement the API with Express.js.

```jsx
const express = require('express');
const mysql = require('mysql');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: 'password', // Your MySQL password
  database: 'example_db'
});

// Connect to MySQL
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Create Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Routes

// GET all users
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500);
      res.send('Error fetching users');
      return;
    }
    res.json(results);
  });
});

// POST a new user
app.post('/users', (req, res) => {
  const { username, email } = req.body;
  connection.query(`INSERT INTO users (username, email) VALUES ('${username}', '${email}')`, (err, result) => {
    if (err) {
      console.error('Error creating user:', err);
      res.status(500);
      res.send('Error creating user');
      return;
    }
    res.status(201);
    res.send('User created successfully');
  });
});

//Similarly create the other APIs
```

**Run Your Application:**

- Start your Node.js application by running `node index.js`.
- Your API will be accessible at `http://localhost:3000`.
