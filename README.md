🏗️ Construction Field Management Backend

Backend for construction project management system — includes authentication, project tracking, and daily progress reports (DPR).
Built for Intern Selection Task.

🚀 Tech Stack
Layer	Technology
Language	Node.js (Express)
Database	MySQL / SQLite
ORM	Sequelize
Authentication	JWT
Tools	Postman, VS Code
📂 Project Structure
src/
 ├── config/
 ├── controllers/
 ├── middleware/
 ├── models/
 ├── routes/
 └── utils/
.env.example
sql_schema.sql
package.json
README.md

⚙️ Setup Instructions
1. Clone repository
git clone https://github.com/yourusername/construction-app-backend.git
cd construction-app-backend

2. Install dependencies
npm install

3. Create .env file
PORT=5000
JWT_SECRET=yourSecretKey
DATABASE_URL=./database.sqlite

4. Start server
npm run dev

🗄️ Database Schema
✔ users table
column	type
id	int PK
name	varchar
email	varchar (unique)
password	varchar
role	enum(admin, manager, worker)
created_at	timestamp
✔ projects table
column	type
id	int PK
name	varchar
description	text
start_date	date
end_date	date
status	enum(planned, active, completed)
created_by	FK users.id
created_at	timestamp
✔ daily_reports table
column	type
id	int PK
project_id	FK projects.id
user_id	FK users.id
date	date
work_description	text
weather	varchar
worker_count	int
created_at	timestamp
🔗 ER DIAGRAM

(You may generate an image using draw.io or I can create one for you.)

users (1) ---- (∞) projects
users (1) ---- (∞) daily_reports
projects (1) ---- (∞) daily_reports

🔐 Authentication API
POST /auth/register
Request:
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "password": "123456",
  "role": "manager"
}

Response:
{
  "message": "User registered successfully"
}

POST /auth/login
Request:
{
  "email": "john@gmail.com",
  "password": "123456"
}

Response:
{
  "token": "jwt-token-here"
}

🏗️ Project APIs
POST /projects

Authenticated

{
  "name": "Building A",
  "description": "New 3-floor building",
  "start_date": "2025-01-01",
  "end_date": "2025-02-01",
  "status": "active"
}

GET /projects

Query params: status, limit

GET /projects/:id

Returns full project details + DPRs.

PUT /projects/:id
DELETE /projects/:id

Deletes project.

📅 Daily Report (DPR) APIs
POST /reports
{
  "project_id": 1,
  "user_id": 3,
  "date": "2025-02-10",
  "work_description": "Foundation completed",
  "weather": "Sunny",
  "worker_count": 12
}

GET /reports

Query params: project_id, date

📂 Postman Collection

Include it in repo:

construction-app.postman_collection.json

🎥 Walkthrough Video
https://drive.google.com/your-demo-video
