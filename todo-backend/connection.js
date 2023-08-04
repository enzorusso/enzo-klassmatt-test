const { Pool } = require('pg');
require('dotenv').config();

const postgres = () => {
	try {
		const pool = new Pool({
			user: process.env.DB_USER,
			host: process.env.DB_HOST,
			database: process.env.DB_NAME,
			password: process.env.DB_PASSWORD,
			port: 5432,
		});

		return pool;
	} catch (error) {
		throw new Error(error);
	}
};

module.exports = { postgres };