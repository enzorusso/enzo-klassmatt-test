CREATE DATABASE todolist;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

\c todolist;

CREATE TABLE IF NOT EXISTS tasks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(45) NOT NULL,
    description VARCHAR(200) NOT NULL,
    checked BOOLEAN NOT NULL,
    due_date DATE
);