CREATE DATABASE IF NOT EXISTS construction_db;
USE construction_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  createdAt DATETIME,
  updatedAt DATETIME
);

CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  startDate DATE,
  endDate DATE,
  userId INT,
  createdAt DATETIME,
  updatedAt DATETIME,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE daily_reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  projectId INT,
  reportDate DATE,
  notes TEXT,
  progressPercent INT,
  createdAt DATETIME,
  updatedAt DATETIME,
  FOREIGN KEY (projectId) REFERENCES projects(id) ON DELETE CASCADE
);
