const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Database setup
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to SQLite database');
});

// Create tables
const createTables = () => {
  db.run(`CREATE TABLE Authors (
    AuthorID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE Genres (
    GenreID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    Description TEXT
  )`);

  db.run(`CREATE TABLE Books (
    BookID INTEGER PRIMARY KEY,
    Title TEXT NOT NULL,
    AuthorID INTEGER,
    GenreID INTEGER,
    Pages INTEGER,
    PublishedDate TEXT,
    FOREIGN KEY (AuthorID) REFERENCES Authors(AuthorID),
    FOREIGN KEY (GenreID) REFERENCES Genres(GenreID)
  )`);
};

createTables();

// API endpoints
app.get('/books', (req, res) => {
  db.all(`SELECT * FROM Books`, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/books', (req, res) => {
  const { Title, AuthorID, GenreID, Pages, PublishedDate } = req.body;
  db.run(
    `INSERT INTO Books (Title, AuthorID, GenreID, Pages, PublishedDate) VALUES (?, ?, ?, ?, ?)`
    [Title, AuthorID, GenreID, Pages, PublishedDate],
    function(err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ BookID: this.lastID });
    }
  );
});

app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const { Title, AuthorID, GenreID, Pages, PublishedDate } = req.body;
  db.run(
    `UPDATE Books SET Title = ?, AuthorID = ?, GenreID = ?, Pages = ?, PublishedDate = ? WHERE BookID = ?`,
    [Title, AuthorID, GenreID, Pages, PublishedDate, id],
    function(err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ changes: this.changes });
    }
  );
});

app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM Books WHERE BookID = ?`, id, function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ changes: this.changes });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
