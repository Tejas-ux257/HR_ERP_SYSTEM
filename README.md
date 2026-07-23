<div align="center">

  <!-- Animated Typing Header -->
  <a href="https://github.com/Tejas-ux257/HR_ERP_SYSTEM">
    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=32&pause=1000&color=61DAFB&center=true&vcenter=true&width=700&height=70&lines=%F0%9F%9A%80+HR+ERP+SYSTEM;Enterprise+Human+Resource+Platform;React+%E2%80%A2+Flask+%E2%80%A2+MySQL+%E2%80%A2+JWT" alt="Typing Header" />
  </a>

  <p align="center">
    <strong>A modern, enterprise-grade Full Stack Human Resource Management Platform built for scalable workforce management and complete employee lifecycle automation.</strong>
  </p>

  <!-- Badges -->
  <p align="center">
    <a href="https://github.com/Tejas-ux257/HR_ERP_SYSTEM/stargazers"><img src="https://img.shields.io/github/stars/Tejas-ux257/HR_ERP_SYSTEM?style=for-the-badge&color=gold" alt="Stars"></a>
    <a href="https://github.com/Tejas-ux257/HR_ERP_SYSTEM/network/members"><img src="https://img.shields.io/github/forks/Tejas-ux257/HR_ERP_SYSTEM?style=for-the-badge&color=orange" alt="Forks"></a>
    <a href="https://github.com/Tejas-ux257/HR_ERP_SYSTEM/issues"><img src="https://img.shields.io/github/issues/Tejas-ux257/HR_ERP_SYSTEM?style=for-the-badge&color=red" alt="Issues"></a>
    <a href="https://github.com/Tejas-ux257/HR_ERP_SYSTEM/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Tejas-ux257/HR_ERP_SYSTEM?style=for-the-badge&color=green" alt="License"></a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Python-3.11+-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python">
    <img src="https://img.shields.io/badge/Flask-2.x-000000?style=flat-square&logo=flask&logoColor=white" alt="Flask">
    <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React">
    <img src="https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white" alt="MySQL">
    <img src="https://img.shields.io/badge/JWT-Secure-000000?style=flat-square&logo=json-web-tokens&logoColor=white" alt="JWT">
    <img src="https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=flat-square&logo=bootstrap&logoColor=white" alt="Bootstrap">
  </p>

  <p align="center">
    <a href="#-key-features">Key Features</a> •
    <a href="#-system-architecture">Architecture</a> •
    <a href="#-database-schema--sql">Database Schema</a> •
    <a href="#-installation--setup">Quick Start</a> •
    <a href="#-api-documentation">API Docs</a>
  </p>

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Industry Problem vs Solution](#-industry-problem-vs-proposed-solution)
- [Who Can Use This?](#-who-can-use-this)
- [Key Features & Role Matrix](#-key-features--role-matrix)
- [System Architecture](#-system-architecture)
- [Database Schema & SQL](#-database-schema--sql)
- [Technology Stack](#-technology-stack)
- [Project Directory Structure](#-project-directory-structure)
- [Installation & Setup](#-installation--setup)
- [API Documentation](#-api-documentation)
- [Security Implementation](#-security-implementation)
- [Deployment Guide](#-deployment-guide)
- [Future Roadmap](#-future-roadmap)
- [Troubleshooting & FAQ](#-troubleshooting--faq)
- [Contributing](#-contributing)
- [Author & Acknowledgments](#-author--acknowledgments)

---

## 🌟 Overview

Managing employees manually becomes increasingly complex as organizations grow. Many companies still rely on spreadsheets, paperwork, emails, and disconnected tools to track daily attendance, leave approvals, payroll generation, department assignments, and personal records.

The **HR ERP System** provides a centralized **Enterprise HR ERP Platform** that digitizes the entire employee lifecycle—from onboarding to monthly salary disbursement. The platform enhances operational transparency, cuts manual workload, eliminates human error in compensation math, and provides secure role-based access for Administrators, HR teams, and Employees.

---

## 🎯 Industry Problem vs Proposed Solution

| Industry Pain Points ❌ | HR ERP Platform Solution ✅ |
| :--- | :--- |
| **Manual & Error-Prone Attendance**: Paper logs or spreadsheets lead to time theft and tracking inaccuracies. | **Digital Check-In/Out Portal**: Real-time timestamps for check-in and check-out tied to attendance history. |
| **Opaque Leave Management**: Email chains result in delayed approvals, lost records, and scheduling conflicts. | **Automated Leave Workflow**: Self-service leave requests with real-time status updates (Pending/Approved/Rejected). |
| **Payroll Miscalculations**: Manual salary, allowance, and deduction calculations cause payroll discrepancies. | **Dynamic Salary Engine**: Automated monthly payroll processing factoring in base pay and deductions. |
| **Data Silos & Security Risks**: Unprotected spreadsheets lead to unauthorized viewing of sensitive salary data. | **JWT & Role-Based Security**: Strict Access Control ensuring users only see data explicitly permitted by their role. |
| **Lack of Employee Self-Service**: Employees must email HR repeatedly to check leave balances or pay records. | **Self-Service Dashboard**: Dedicated portal for employees to review profile, check attendance, and view pay history. |

---

## 🏢 Who Can Use This?

* 🏢 **Small & Medium Businesses (SMBs)** – Streamline HR workflows without expensive enterprise software.
* 🚀 **Startups** – Rapidly manage growing teams with clear role permissions.
* 🎓 **Educational Institutions** – Manage faculty, staff, department hierarchies, and attendance logs.
* 🏭 **Manufacturing & Corporate HR** – Centralize employee onboarding, shift check-ins, and monthly payroll.
* 💻 **IT Companies & Agencies** – Track remote or office staff with real-time dashboard analytics.

---

## ✨ Key Features & Role Matrix

### 1. Detailed Feature List

* 🔑 **Authentication & Authorization**: JWT-based login, password salting/hashing via bcrypt, session management, and protected client/server routes.
* 🏢 **Department Module**: Full CRUD operations for creating, editing, viewing, and deleting organizational departments.
* 👥 **Employee Management**: Register new staff, assign roles (Admin, HR, Employee), map departments, update personal info, and search directory.
* 🕒 **Attendance Tracking**: Real-time Check-In and Check-Out actions with timestamp logging and full user history.
* 📅 **Leave Management System**: Submit leave requests with custom date ranges and reasons; HR/Admin review and approve/reject requests.
* 💰 **Payroll Engine**: Generate monthly salary disbursements, manage basic pay vs deductions, and maintain printable history logs.
* 📊 **Multi-Role Dashboards**: Role-tailored home dashboards with real-time statistics, active clocks, and recent activity feeds.

---

### 2. Access Control Matrix

| Feature / Module | 👨‍💼 Admin | 👩‍💼 HR Manager | 👨‍💻 Employee |
| :--- | :---: | :---: | :---: |
| **View Analytics Dashboard** | Full System | Department Level | Personal Summary |
| **Create / Edit / Delete Departments** | ✅ | ❌ (Read Only) | ❌ |
| **Register & Manage Employees** | ✅ | ✅ | ❌ |
| **Mark Daily Attendance (Check-In/Out)** | ✅ | ✅ | ✅ |
| **Manage & Review All Attendance Logs** | ✅ | ✅ | Personal History Only |
| **Apply for Leave** | ✅ | ✅ | ✅ |
| **Approve / Reject Leave Requests** | ✅ | ✅ | ❌ |
| **Generate Monthly Payroll** | ✅ | ✅ | ❌ |
| **View Payroll Slips** | ✅ | ✅ | Personal Slips Only |
| **Update Personal Profile & Password** | ✅ | ✅ | ✅ |

---

## 🏗 System Architecture

The application adopts a **Decoupled Client-Server Architecture**. The React Single Page Application (SPA) renders UI state and executes asynchronous REST API requests using Axios. The Python Flask backend validates JWT bearer tokens via middleware before processing logic through service/controller layers and interacting with MySQL.

```mermaid
graph TD
    %% Client Layer
    subgraph Client Tier [Frontend - React SPA]
        A[User Browser Interface] -->|React Router| B[State & Hooks Context]
        B -->|Axios REST Calls| C[JWT Authorization Token Header]
    end

    %% Network Gateway
    C -->|HTTPS / JSON API Requests| D[Flask Gateway Router]

    %% Server Layer
    subgraph Server Tier [Backend - Python Flask]
        D --> E{JWT Token Middleware}
        E -->|Authenticated| F[Flask Blueprints Routes]
        E -->|Unauthorized| G[401 / 403 Standard JSON Response]
        
        F --> H[Controllers Layer]
        H --> I[Business Logic Services Layer]
        I --> J[Data Access & PyMySQL Layer]
    end

    %% Database Layer
    subgraph Storage Tier [Relational Database]
        J -->|SQL Queries & Connection Pool| K[(MySQL Database: hr_erp_db)]
    end 



🗂 Database Schema & SQL
1. Entity-Relationship Diagram (ERD)
erDiagram
    USERS ||--o{ ATTENDANCE : "logs"
    USERS ||--o{ LEAVE_REQUESTS : "applies"
    USERS ||--o{ PAYROLL : "receives"
    DEPARTMENTS ||--o{ USERS : "belongs to"

    USERS {
        int id PK
        string full_name
        string email UK
        string password_hash
        enum role "Admin, HR, Employee"
        int department_id FK
        datetime created_at
    }

    DEPARTMENTS {
        int id PK
        string department_name UK
        string description
        datetime created_at
    }

    ATTENDANCE {
        int id PK
        int user_id FK
        date date
        time check_in
        time check_out
        enum status "Present, Absent, Half-Day"
    }

    LEAVE_REQUESTS {
        int id PK
        int user_id FK
        date start_date
        date end_date
        string reason
        enum status "Pending, Approved, Rejected"
        datetime applied_at
    }

    PAYROLL {
        int id PK
        int user_id FK
        string month_year
        decimal basic_salary
        decimal deductions
        decimal net_salary
        datetime generated_at
    }

2. Complete Database Setup Script (schema.sql)
Execute this complete SQL initialization script in your MySQL environment
-- Create Database
CREATE DATABASE IF NOT EXISTS hr_erp_db;
USE hr_erp_db;

-- 1. Departments Table
CREATE TABLE IF NOT EXISTS departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Users / Employees Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'HR', 'Employee') NOT NULL DEFAULT 'Employee',
    department_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Attendance Table
CREATE TABLE IF NOT EXISTS attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    date DATE NOT NULL,
    check_in TIME,
    check_out TIME,
    status ENUM('Present', 'Absent', 'Half-Day') DEFAULT 'Present',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY user_daily_attendance (user_id, date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Leave Requests Table
CREATE TABLE IF NOT EXISTS leave_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT NOT NULL,
    status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Payroll Table
CREATE TABLE IF NOT EXISTS payroll (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    month_year VARCHAR(20) NOT NULL,
    basic_salary DECIMAL(10, 2) NOT NULL,
    deductions DECIMAL(10, 2) DEFAULT 0.00,
    net_salary DECIMAL(10, 2) NOT NULL,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Initial Seed Data (Optional)
INSERT INTO departments (department_name, description) VALUES 
('Engineering', 'Software development and technical operations'),
('Human Resources', 'Talent acquisition, employee welfare, and compliance'),
('Finance', 'Accounting, payroll, and financial planning');

🧩 Technology Stack
Frontend
Core Framework: React.js (v18+)

Routing: React Router DOM (v6+)

HTTP Client: Axios

UI Styling: Bootstrap 5

Icons & Notifications: react-icons, react-toastify

Backend
Language & Runtime: Python 3.11+

Framework: Flask (using Blueprints)

Authentication: PyJWT

Password Hashing: bcrypt

CORS Management: flask-cors

Database & Tools
Database: MySQL 8.0

Driver: PyMySQL / mysql-connector-python

API Testing: Postman

Version Control: Git & GitHub

📂 Project Directory Structure

HR_ERP_SYSTEM/
│
├── app/                        # Backend Application Package
│   ├── controllers/            # Request handlers parsing client inputs
│   │   ├── auth_controller.py
│   │   ├── employee_controller.py
│   │   ├── attendance_controller.py
│   │   ├── leave_controller.py
│   │   └── payroll_controller.py
│   ├── services/               # Core business logic processing
│   ├── routes/                 # Flask Blueprints registration
│   ├── models/                 # SQL database models & queries
│   ├── validators/             # Request payload validation scripts
│   ├── utils/                  # JWT and security helper modules
│   ├── database.py             # Database connector pool setup
│   └── __init__.py             # Flask App Factory setup
│
├── frontend/                   # Client-Side React Application
│   ├── public/                 # Static HTML entry point & favicon
│   └── src/
│       ├── Admin/              # Admin administrative panels
│       ├── Employee/           # Employee self-service components
│       ├── Components/         # Shared Navigation, Sidebar, Modals
│       ├── Services/           # Axios instance & API method calls
│       ├── Pages/              # Primary route views (Login, Home)
│       ├── App.js              # Top-level routing & provider tree
│       └── index.js            # React DOM mounting initialization
│
├── .env.example                # Template for environment configuration
├── schema.sql                  # MySQL database initialization script
├── requirements.txt            # Python dependencies manifest
├── run.py                      # Backend server execution entry point
└── README.md                   # System documentation




⚙ Installation & Setup
Prerequisites
Ensure you have the following installed on your machine:

Python (v3.11 or higher)

Node.js (v18 or higher) & npm

MySQL Server (v8.0 or higher)

1. Clone Repository



git clone [https://github.com/Tejas-ux257/HR_ERP_SYSTEM.git](https://github.com/Tejas-ux257/HR_ERP_SYSTEM.git)
cd HR_ERP_SYSTEM


2. Database ConfigurationStart your MySQL server and execute the database script:Bashmysql -u root -p < schema.sql
3. Backend Setup (Flask REST API)Navigate to root and create a virtual environment:Bashpython -m venv venv
Activate virtual environment:Windows:DOSvenv\Scripts\activate
macOS / Linux:Bashsource venv/bin/activate
Install required dependencies:Bashpip install -r requirements.txt
Create a .env file in the root directory:Code snippetDB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=hr_erp_db
JWT_SECRET_KEY=super_secret_jwt_key_for_hr_erp
PORT=5000
Run the Flask backend server:Bashpython run.py
Backend running on http://127.0.0.1:50004. Frontend Setup (React SPA)Navigate to the frontend folder:Bashcd frontend
Install Node packages:Bashnpm install
Configure frontend environment variables by creating .env inside frontend/:Code snippetREACT_APP_API_URL=[http://127.0.0.1:5000/api](http://127.0.0.1:5000/api)
Start the frontend client:Bashnpm start
Frontend running on http://localhost:3000🧪 API DocumentationAll request payloads and responses use standard JSON formatting with standard status codes (200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden).1. Authentication EndpointsPOST /api/auth/loginAuthenticates user credentials and returns a signed JWT Token.Request Body:JSON{
  "email": "admin@company.com",
  "password": "AdminPassword123"
}
Response (200 OK):JSON{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "full_name": "Tejas Kumar D",
    "email": "admin@company.com",
    "role": "Admin",
    "department_id": 1
  }
}
2. Department EndpointsMethodEndpointAccess LevelDescriptionGET/api/departmentsAuthenticatedFetch list of all active departmentsPOST/api/departmentsAdminCreate a new organizational departmentPUT/api/departments/:idAdminUpdate department name and descriptionDELETE/api/departments/:idAdminDelete an existing department3. Employee EndpointsMethodEndpointAccess LevelDescriptionGET/api/employeesAdmin / HRFetch directory of all registered employeesPOST/api/employeesAdmin / HRRegister a new user profilePUT/api/employees/:idAdmin / HRUpdate employee department or detailsDELETE/api/employees/:idAdminDelete an employee account4. Attendance EndpointsMethodEndpointAccess LevelDescriptionPOST/api/attendance/check-inAuthenticatedRecord current timestamp for entryPOST/api/attendance/check-outAuthenticatedRecord current timestamp for departureGET/api/attendance/historyAuthenticatedRetrieve personal or system-wide logs5. Leave Management EndpointsMethodEndpointAccess LevelDescriptionPOST/api/leave/applyAuthenticatedSubmit a new leave requestGET/api/leave/requestsAdmin / HRRetrieve all pending leave applicationsPUT/api/leave/status/:idAdmin / HRUpdate leave status (Approved / Rejected)6. Payroll EndpointsMethodEndpointAccess LevelDescriptionPOST/api/payroll/generateAdmin / HRProcess dynamic salary calculation for a userGET/api/payroll/history/:user_idAuthenticatedView generated payslips🔐 Security ImplementationCryptographic Hashing: User passwords are encrypted with bcrypt (salting + hashing) prior to database insertion. Raw passwords are never stored.Stateless Authorization: Secure endpoints enforce JWT authorization via custom decorators. Tokens must be passed in the HTTP request header:PlaintextAuthorization: Bearer <your_jwt_token>
Role-Based Access Control (RBAC): Backend endpoints verify role claims within the JWT payload before executing database operations.Input Sanitization: Parameterized SQL queries prevent standard SQL injection risks.🚀 Deployment GuideBackend Deployment (Render / AWS EC2)Ensure gunicorn is included in your requirements.txt:Plaintextgunicorn==21.2.0
Configure environment variables (DB_HOST, DB_USER, DB_PASSWORD, JWT_SECRET_KEY) inside your hosting provider settings panel.Set start command:Bashgunicorn run:app
Frontend Deployment (Vercel / Netlify)Import your GitHub repository to Vercel/Netlify.Set Build Commands:Build Command: npm run buildOutput Directory: buildSet Environment Variable:REACT_APP_API_URL pointing to your deployed backend URL.📈 Future Roadmap[ ] Automated Email Alerts: SMTP email delivery upon leave approvals or payslip generation.[ ] AI-Powered Attendance Insights: Predictive absence analysis and automated workforce shift scheduling.[ ] Biometric & QR Check-In: Hardware API integrations for physical barcode scanning and facial recognition entry.[ ] PDF Exporting: One-click downloadable PDF payslips and CSV performance reports.[ ] Dockerization: Containerize frontend, backend, and MySQL using docker-compose.❓ Troubleshooting & FAQ🤝 ContributingContributions are welcome! Follow these steps to contribute:Fork the RepositoryCreate a Feature Branch:Bashgit checkout -b feature/NewFeature
Commit Your Changes:Bashgit commit -m "Add NewFeature"
Push to the Branch:Bashgit push origin feature/NewFeature
Open a Pull Request👨‍💻 AuthorTejas Kumar DComputer Science & Engineering Student | Full Stack & AI Developer🌐 GitHub: @Tejas-ux257💼 LinkedIn: Tejas Kumar D📧 Email: tejaskumard2004@gmail.com⭐ Found this repository useful? Give it a Star!Designed with ❤️ by Tejas Kumar D



