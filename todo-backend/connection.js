const { Pool } = require('pg');

const postgres = () => {
  try {
    const pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'todolist',
      password: 'root',
      port: 5432,
    });

    // await pool.connect();
    return pool;
  } catch (error) {
    console.log(error);
  }
};

const endConnection = async (pool) => {
  await pool.end();
}

module.exports = {postgres, endConnection}