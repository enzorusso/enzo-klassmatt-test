const express = require('express');
const { postgres } = require('./connection');
const app = express();
const cors = require('cors');
const port = 3001;

app.use(cors())
app.use(express());
app.use(express.json());

const db = postgres();

app.get("/api/tasks", function(req, res) {
  db.query(
    'SELECT * FROM tasks ORDER BY id ASC', (error, results) => {
      if(error) {
        res.status(500).send(JSON.stringify(error));
      }
      res.status(200).send(JSON.stringify(results?.rows));
    }
  )
});

app.post("/api/tasks", function(req, res) {
  const { title, description, checked, due_date } = req.body;
  db.query(
    'INSERT INTO tasks (title, description, checked, due_date) VALUES ($1, $2, $3, $4) RETURNING *', [title, description, checked, due_date], (error, results) => {
      if (error) {
        res.status(500).send(JSON.stringify(error));
      }
      res.status(201).send(
        `Task added with: 
        ${results.rows[0].id}, 
        ${results.rows[0].title},
        ${results.rows[0].description},
        ${results.rows[0].checked},
        ${results.rows[0].due_date},
        `)
    }
  )
});

app.put("/api/tasks/:id", function(req, res) {
  const id = req.params.id;
  const { title, description, checked, due_date } = req.body;

  db.query(
    'UPDATE tasks SET title = $1, description = $2, checked = $3, due_date = $4 WHERE id = $5',
    [title, description, checked, due_date, id],
    (error, results) => {
      if (error) {
        res.status(500).send(JSON.stringify(error));
      }
      res.status(201).send(
        `Task modified with: 
        ${id}, 
        ${title},
        ${description},
        ${checked},
        ${due_date},
        `)
    }
  )
});

app.delete("/api/tasks/:id", function(req, res) {
  const id = req.params.id

  db.query(
    'DELETE FROM tasks WHERE id = $1',
    [id],
    (error, results) => {
      if (error) {
        res.status(500).send(JSON.stringify(error));
      }
      res.status(204).send(`Task deleted with ID: ${id}`)
    }
  )
});

app.listen(port, () => console.log(`Express app running on port ${port}!`));