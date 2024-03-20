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

// put method

app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const { username, email } = req.body;
  
    connection.query('UPDATE users SET username = ?, email = ? WHERE id = ?', [username, email, id], (err, result) => {
      if (err) {
        console.error('Error updating user:', err);
        res.status(500).send('Error updating user');
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).send('User not found');
        return;
      }
      res.send('User updated successfully');
    });
  });

  // delete method

  app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
  
    connection.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error('Error deleting user:', err);
        res.status(500).send('Error deleting user');
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).send('User not found');
        return;
      }
      res.send('User deleted successfully');
    });
  });