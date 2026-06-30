# HR ERP System Backend

A RESTful backend API built using **Python Flask** and **MySQL** following a **Layered Architecture**.

The project manages **Departments** and **Employees** and is designed to be scalable for future HR ERP modules such as Attendance, Payroll, Leave Management, Authentication, and Reports.

---

## Tech Stack

- Python 3.x
- Flask
- Flask-CORS
- MySQL
- MySQL Connector
- python-dotenv

---

## Project Architecture

The project follows a layered architecture.

Client
↓

Routes

↓

Controllers

↓

Validators

↓

Services

↓

Database

↓

Models

↓

JSON Response


Each layer has a single responsibility.

---

## Project Structure


erp_sys/
│
├── .env
├── .gitignore
├── README.md
├── requirements.txt
├── run.py
│
├── app/
│
├── config.py
├── database.py
├── controllers/
├── models/
├── routes/
├── services/
├── validators/
└── utils/


---

## Database

Database Name


hr_erp_db


### Departments

| Column | Type |
|---------|------|
| department_id | INT |
| department_name | VARCHAR(100) |
| department_code | VARCHAR(20) |

---

### Employees

| Column | Type |
|---------|------|
| id | INT |
| department_id | INT (Foreign Key) |
| name | VARCHAR(100) |
| phone | VARCHAR(15) |
| email | VARCHAR(100) |

---

## API Modules

### Department Module

Implemented

- Create Department
- Get All Departments
- Get Department By ID
- Update Department
- Delete Department

### Employee Module

Coming Next

- Create Employee
- Get All Employees
- Get Employee
- Update Employee
- Delete Employee

---

## API Endpoints

### Departments

| Method | Endpoint |
|---------|----------|
| POST | /departments |
| GET | /departments |
| GET | /departments/{id} |
| PUT | /departments/{id} |
| DELETE | /departments/{id} |

---

## Installation

Clone the repository.

```bash
git clone <repository-url>

Go to the project.

cd erp_sys

Create virtual environment.

python -m venv venv

Activate virtual environment.

Windows

venv\Scripts\activate

Linux / macOS

source venv/bin/activate

Install dependencies.

pip install -r requirements.txt
Environment Variables

Create a .env file.

DB_HOST=localhost
DB_PORT=3306
DB_NAME=hr_erp_db
DB_USER=app_user
DB_PASSWORD=AppPassword123

APP_PORT=8080
FLASK_ENV=development
FLASK_DEBUG=True
Run Application
python run.py

Server runs on

http://localhost:8080

Testing APIs
Create Department
curl -X POST http://localhost:8080/departments \
-H "Content-Type: application/json" \
-d '{"department_name":"IT","department_code":"IT001"}'
Get Departments
curl http://localhost:8080/departments
API Response Format

Success

{
    "status":"success",
    "message":"Success",
    "data":{}
}

Error

{
    "status":"error",
    "message":"Department not found"
}

Future Modules:

Employee Management
Attendance Management
Leave Management
Payroll Management
User Authentication
Role Based Access Control (RBAC)
Reports
Dashboard APIs


# HR ERP System Backend

A RESTful Backend API built using **Python Flask** and **MySQL** following a **Layered Architecture**.

---

## 🚀 Current Status

✅ Department CRUD Module Completed

- Create Department
- Get All Departments
- Get Department by ID
- Update Department
- Delete Department

🚧 Employee Module (In Progress)

---

## 🛠️ Tech Stack

- Python 3
- Flask
- Flask-CORS
- MySQL
- MySQL Connector
- Python Dotenv

---

## 📂 Project Structure

```text
erp_sys/
│
├── app/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── validators/
│   └── utils/
│
├── .env
├── requirements.txt
└── run.py
```

---

## 🗄️ Database

Database Name

```
hr_erp_db
```

Tables

- departments
- employees

---

## 📌 Department APIs

| Method | Endpoint |
|---------|----------|
| POST | `/departments` |
| GET  | `/departments` |
| GET  | `/departments/{id}` |
| PUT  | `/departments/{id}` |
| DELETE | `/departments/{id}` |

---

## ▶️ Run Project

Install dependencies

```bash
pip install -r requirements.txt
```

Run the server

```bash
python run.py
```

Server URL

```
http://localhost:8080
```

---

## 📖 Features

- Layered Architecture
- REST API
- CRUD Operations
- MySQL Database Integration
- JSON Responses
- Input Validation
- Error Handling

---

## 🔄 Upcoming Features

- Employee Management
- Attendance Management
- Leave Management
- Payroll Management
- Authentication
- JWT Security
- Role-Based Access Control (RBAC)

---
