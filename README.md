<div align="center">

  <!-- Animated Header Banner -->
  <a href="https://github.com/Tejas-ux257/HR_ERP_SYSTEM">
    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=32&pause=1000&color=61DAFB&center=true&vcenter=true&width=700&height=70&lines=%F0%9F%9A%80+HR+ERP+SYSTEM;Enterprise+Human+Resource+Platform;React+%E2%80%A2+Flask+%E2%80%A2+MySQL+%E2%80%A2+JWT" alt="Typing Header" />
  </a>

  <p align="center">
    <strong>A modern, enterprise-grade Full Stack Human Resource Management System built for scalable workforce management.</strong>
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
    <a href="#-demo--previews">View Demo</a> •
    <a href="#-key-features">Key Features</a> •
    <a href="#-system-architecture">Architecture</a> •
    <a href="#-installation--setup">Quick Start</a> •
    <a href="#-api-documentation">API Docs</a>
  </p>

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Industry Problem vs Solution](#-industry-problem-vs-proposed-solution)
- [Demo & Previews](#-demo--previews)
- [System Architecture](#-system-architecture)
- [Database Schema (ER Diagram)](#-database-schema-er-diagram)
- [Key Features & Role Matrix](#-key-features--role-matrix)
- [Technology Stack](#-technology-stack)
- [Project Directory Structure](#-project-directory-structure)
- [Installation & Setup](#-installation--setup)
- [API Documentation](#-api-documentation)
- [Security Implementation](#-security-implementation)
- [Deployment Guide](#-deployment-guide)
- [Future Roadmap](#-future-roadmap)
- [Troubleshooting & FAQ](#-troubleshooting--faq)
- [Author & Acknowledgments](#-author--acknowledgments)

---

## 🌟 Overview

As organizations scale, managing employee lifecycles using disjointed spreadsheets, paper applications, and email chains introduces operational friction, data redundancy, and security risks. 

The **HR ERP System** is an end-to-end, full-stack enterprise web application designed to digitize, streamline, and secure core human resource processes. From **automated attendance logging** and **tiered leave approvals** to **dynamic monthly payroll calculations** and **Role-Based Access Control (RBAC)**, this platform centralizes corporate workforce management into a unified dashboard.

---

## 🎯 Industry Problem vs Proposed Solution

| Industry Pain Points ❌ | HR ERP Platform Solution ✅ |
| :--- | :--- |
| **Manual & Error-Prone Attendance**: Pen-and-paper or manual spreadsheet logs lead to inaccuracies. | **Digital Check-In System**: Real-time timestamps for check-in/out tied directly to payroll logs. |
| **Opaque Leave Management**: Untracked paper forms result in delayed approvals and scheduling conflicts. | **Automated Leave Workflow**: Employees apply online; Admins/HR approve/reject with real-time status updates. |
| **Payroll Miscalculations**: Manual tax, deduction, and bonus calculations cause financial discrepancies. | **Dynamic Salary Engine**: Automated monthly payroll processing factoring in attendance and allowances. |
| **Data Silos & Security Risks**: Unauthorized access to sensitive compensation data in unencrypted files. | **JWT & RBAC Security**: Granular access control ensuring users only view data explicitly permitted by their role. |

---

## 🎬 Demo & Previews

> **Note:** Replace placeholders below with actual recordings/screenshots of your app.

### 🎥 Application Walkthrough
![HR ERP System Walkthrough Placeholder](https://via.placeholder.com/1000x500/0f172a/61DAFB?text=Insert+Animated+GIF+or+Demo+Video+Here)

### 📸 Core Interface Screenshots

<details>
<summary>🔍 <b>Click to expand UI Screenshots</b></summary>

<br />

| Admin Dashboard | HR Management Portal |
| :---: | :---: |
| ![Admin Dashboard](https://via.placeholder.com/450x250/1e293b/ffffff?text=Admin+Dashboard+Preview) | ![HR Dashboard](https://via.placeholder.com/450x250/1e293b/ffffff?text=HR+Portal+Preview) |

| Employee Self-Service Portal | Attendance & Payroll Views |
| :---: | :---: |
| ![Employee Portal](https://via.placeholder.com/450x250/1e293b/ffffff?text=Employee+Portal+Preview) | ![Payroll View](https://via.placeholder.com/450x250/1e293b/ffffff?text=Payroll+Module+Preview) |

</details>

---

## 🏗 System Architecture

The application adopts a **Client-Server Architecture** featuring a decoupled **React SPA (Single Page Application)** frontend communicating via RESTful JSON endpoints with a **Flask Application Factory** backend, backed by an optimized **MySQL** relational database.

```mermaid
graph TD
    %% User Tier
    subgraph Client Tier [Frontend - React SPA]
        A[Admin / HR / Employee UI] -->|React Router| B[State & Hooks]
        B -->|Axios REST Client| C[JWT Authorization Header]
    end

    %% Network
    C -->|HTTPS / JSON API Requests| D[Flask Gateway Middleware]

    %% Backend Server
    subgraph Server Tier [Backend - Python Flask]
        D --> E{JWT Validator}
        E -->|Authenticated| F[Blueprints Routing Layer]
        E -->|Unauthorized| G[401 / 403 Standard JSON Response]
        
        F --> H[Controllers Layer]
        H --> I[Business Logic Services]
        I --> J[Data Access / ORM Layer]
    end

    %% Database Tier
    subgraph Storage Tier [Relational Database]
        J -->|SQL Queries / Connection Pool| K[(MySQL Database)]
    end