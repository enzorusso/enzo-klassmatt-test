const express = require('express');
const cors = require('cors');

const { postgres } = require('./connection');
const queries = require('./queries')

const port = 3001;
const app = express();

app.use(cors())
app.use(express());
app.use(express.json());

const db = postgres();

app.get("/api/tasks", queries.getTasks);

app.post("/api/tasks", queries.createTask);

app.put("/api/tasks/:id", queries.updateTask);

app.delete("/api/tasks/:id", queries.deleteTask);

app.listen(port, () => console.log(`Express app running on port ${port}!`));