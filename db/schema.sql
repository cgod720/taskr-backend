-- Create the database
CREATE DATABASE taskr;
\c taskr;

-- Create the users table
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(100) NOT NULL
);

-- Create the tasks table
CREATE TABLE tasks (
  task_id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  due_date TIMESTAMPTZ,
  priority INT,
  status VARCHAR(20),
  creator_id INT REFERENCES users(user_id)
);

-- Create the assignments table
CREATE TABLE assignments (
  assignment_id SERIAL PRIMARY KEY,
  task_id INT REFERENCES tasks(task_id),
  assignee_id INT REFERENCES users(user_id),
  assigned_by_id INT REFERENCES users(user_id),
  assignment_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create the comments table
CREATE TABLE comments (
  comment_id SERIAL PRIMARY KEY,
  task_id INT REFERENCES tasks(task_id),
  user_id INT REFERENCES users(user_id),
  comment_text TEXT,
  comment_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create the files table
CREATE TABLE files (
  file_id SERIAL PRIMARY KEY,
  task_id INT REFERENCES tasks(task_id),
  user_id INT REFERENCES users(user_id),
  file_name VARCHAR(255),
  file_path VARCHAR(255),
  upload_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
