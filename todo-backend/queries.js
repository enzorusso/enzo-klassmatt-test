const { postgres } = require('./connection');

const db = postgres();

const getTasks = function (req, res) {
	db.query('SELECT * FROM tasks ORDER BY id ASC', (error, results) => {
		if (error) {
			res.status(500).send(JSON.stringify(error));
		}
		res
			.status(200)
			.send(
				JSON.stringify(results?.rows.map(({ due_date, ...row }) => ({ ...row, dueDate: due_date })))
			);
	});
};

const createTask = function (req, res) {
	const { title, description, checked, dueDate } = req.body;

	db.query(
		'INSERT INTO tasks (title, description, checked, due_date) VALUES ($1, $2, $3, $4) RETURNING *',
		[title, description, checked, dueDate],
		(error, results) => {
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
        `
			);
		}
	);
};

const updateTask = function (req, res) {
	const id = req.params.id;
	const { title, description, checked, dueDate } = req.body;

	db.query(
		'UPDATE tasks SET title = $1, description = $2, checked = $3, due_date = $4 WHERE id = $5',
		[title, description, checked, dueDate, id],
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
        ${dueDate},
        `
			);
		}
	);
};

const deleteTask = function (req, res) {
	const id = req.params.id;

	db.query('DELETE FROM tasks WHERE id = $1', [id], (error, results) => {
		if (error) {
			res.status(500).send(JSON.stringify(error));
		}
		res.status(204).send(`Task deleted with ID: ${id}`);
	});
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
