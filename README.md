

<div align="center">

# 🗂️ TaskMaster — Full Stack Task Management System

**A production-ready task management application built with Java Spring Boot and React.js**

![Java](https://img.shields.io/badge/Java-17-orange?style=flat-square&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-green?style=flat-square&logo=springboot)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=flat-square&logo=mysql)
![JWT](https://img.shields.io/badge/Auth-JWT-purple?style=flat-square)
![License](https://img.shields.io/badge/License-Educational-lightgrey?style=flat-square)

</div>

---

## 📌 Project Overview

TaskMaster is a secure, full-stack web application that allows users to register, authenticate, and manage their personal tasks through a modern glassmorphism dashboard UI.

The backend exposes RESTful APIs protected with **JWT Bearer token authentication**, while the frontend provides a **premium SaaS-style experience** with real-time toast notifications, animated task cards, and a responsive sidebar layout.

---

## ✨ Features

### 🔐 Authentication & Security
- User registration with BCrypt password hashing
- JWT-based stateless authentication
- Role-based access control (`USER` / `ADMIN`)
- Protected API routes with Spring Security

### 📋 Task Management
- Create, Read, Update, Delete tasks
- Task status tracking: `PENDING` → `IN_PROGRESS` → `COMPLETED`
- Task ownership enforcement (users see only their own tasks)
- One-click status toggle

### 🎨 Modern Frontend UI
- Glassmorphism dark theme dashboard
- Framer Motion animations and page transitions
- Real-time toast notifications (success/error)
- Confirmation modal before destructive actions
- Fully responsive (desktop & mobile)
- Empty state UI with call-to-action

### 🛡️ Admin Panel
- Admin-only endpoint to view all registered users
- Role enforcement via `@PreAuthorize`

### 📖 API Documentation
- Interactive Swagger UI via Springdoc OpenAPI 3.0
- All endpoints documented with request/response schemas

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Java 17, Spring Boot 3.2, Spring Security |
| **Authentication** | JWT (jjwt 0.11.5), BCrypt |
| **Database** | MySQL 8.0 |
| **ORM** | Hibernate / Spring Data JPA |
| **Build Tool** | Maven |
| **API Docs** | Springdoc OpenAPI / Swagger UI |
| **Frontend** | React 18, Vite |
| **Routing** | React Router DOM v6 |
| **HTTP Client** | Axios (with JWT interceptors) |
| **Animations** | Framer Motion |
| **Notifications** | React Hot Toast |
| **Icons** | Lucide React |
| **Styling** | Vanilla CSS (Glassmorphism dark theme) |

---

## 🔐 Authentication Flow

```
┌──────────┐   POST /auth/register or /auth/login   ┌──────────────┐
│  React   │ ─────────────────────────────────────▶  │ Spring Boot  │
│ Frontend │                                          │   Backend    │
│          │ ◀─────────────────────────────────────  │              │
│          │        { token, name, email, role }      │              │
│          │                                          │              │
│  Stores  │  All API calls: Authorization: Bearer ─▶ JWT Filter   │
│  JWT in  │                                          │ validates    │
│ localStorage                                        │ token        │
└──────────┘                                          └──────────────┘
```

1. User registers or logs in → server returns a **signed JWT token**
2. Frontend stores token in `localStorage`
3. Every request includes `Authorization: Bearer <token>` header
4. `JwtAuthenticationFilter` validates the token on every request
5. Valid token → user context set → request proceeds

---

## 📡 API Endpoints

### Authentication (Public)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/auth/register` | Register a new user |
| `POST` | `/api/v1/auth/login` | Login and receive JWT token |

### Tasks (JWT Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/tasks` | Get all tasks for authenticated user |
| `GET` | `/api/v1/tasks/{id}` | Get a specific task by ID |
| `POST` | `/api/v1/tasks` | Create a new task |
| `PUT` | `/api/v1/tasks/{id}` | Update an existing task |
| `DELETE` | `/api/v1/tasks/{id}` | Delete a task |

### Admin (JWT + ADMIN Role Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/admin/users` | Get all registered users |

---

## 🗃️ Database Schema

```sql
-- Users Table
CREATE TABLE users (
    id       BIGINT AUTO_INCREMENT PRIMARY KEY,
    name     VARCHAR(255) NOT NULL,
    email    VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,          -- BCrypt hashed
    role     VARCHAR(50)  NOT NULL DEFAULT 'USER'
);

-- Tasks Table
CREATE TABLE tasks (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(255)  NOT NULL,
    description VARCHAR(1000),
    status      VARCHAR(50)   NOT NULL DEFAULT 'PENDING',
    created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id     BIGINT        NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 🚀 Getting Started

### Prerequisites

- Java 17+
- Maven 3.8+
- Node.js 18+
- MySQL 8.0+

---

### 1. Database Setup

```sql
-- Connect to MySQL and create the database
CREATE DATABASE task_db;
```

Or run the included schema script:
```bash
mysql -u root -p < database_schema.sql
```

---

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Copy the example config and fill in your credentials
cp src/main/resources/application-example.properties \
   src/main/resources/application.properties

# Edit application.properties with your MySQL credentials and JWT secret
# Then build and run:
mvn clean install -DskipTests
mvn spring-boot:run
```

Backend starts at: **http://localhost:8080**

📖 Swagger UI: **http://localhost:8080/swagger-ui.html**

---

### 3. Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Copy the env template
cp .env.example .env

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend starts at: **http://localhost:5173**

---

### 4. Sample API Requests

**Register:**
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Create Task:**
```http
POST /api/v1/tasks
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "title": "Design Dashboard",
  "description": "Create wireframes for main dashboard",
  "status": "IN_PROGRESS"
}
```

---

## 📂 Project Structure

```
Backend_intern/
├── backend/                                 Spring Boot REST API
│   ├── src/main/java/com/taskmanagement/
│   │   ├── config/                          OpenAPI / Swagger config
│   │   ├── controller/                      Auth, Task, Admin controllers
│   │   ├── dto/                             Request / Response DTOs
│   │   ├── entity/                          JPA entities (User, Task, Role)
│   │   ├── exception/                       Global exception handler
│   │   ├── repository/                      Spring Data JPA repositories
│   │   ├── security/                        JWT filter, service, SecurityConfig
│   │   └── service/                         Business logic
│   ├── src/main/resources/
│   │   ├── application-example.properties   ✅ Safe template (committed)
│   │   └── application.properties           🔒 Your local config (gitignored)
│   └── pom.xml
│
├── frontend/                                React + Vite SPA
│   ├── src/
│   │   ├── api/                             Axios with JWT interceptors
│   │   ├── components/                      Sidebar, Navbar, TaskCard, Modals
│   │   ├── context/                         AuthContext (JWT state)
│   │   ├── pages/                           Login, Register, Dashboard
│   │   ├── App.jsx                          Router + Toaster
│   │   └── index.css                        Dark glassmorphism theme
│   ├── .env.example                         ✅ Safe template (committed)
│   ├── .env                                 🔒 Your local config (gitignored)
│   └── package.json
│
├── screenshots/                             UI screenshots for review
├── database_schema.sql                      MySQL schema script
├── README.md                                This file
└── .gitignore
```

---

## 🖼️ Screenshots

| Screen | Preview |
|--------|---------|
| Login Page | ![Login](screenshots/login.png) |
| Register Page | ![Register](screenshots/register.png) |
| Dashboard | ![Dashboard](screenshots/dashboard.png) |
| Task Modal | ![Task Modal](screenshots/task-modal.png) |
| Swagger UI | ![Swagger](screenshots/swagger.png) |

---

## 🌐 Deployment

| Component | Platform | Notes |
|-----------|----------|-------|
| **Frontend** | Vercel | Set `VITE_API_BASE_URL` in Vercel env settings |
| **Backend** | Railway / Render / VPS | Deploy the Spring Boot JAR |
| **Database** | PlanetScale / Railway MySQL | Update datasource URL in env |

**Build frontend for production:**
```bash
cd frontend
npm run build   # Output: frontend/dist/
```

---

## 🔮 Future Improvements

- [ ] Email verification on registration
- [ ] Password reset via email link
- [ ] Task due dates, priority levels, and labels
- [ ] Real-time task updates with WebSockets
- [ ] Admin analytics dashboard with charts
- [ ] Docker Compose for one-command local setup
- [ ] GitHub Actions CI/CD pipeline
- [ ] Unit and integration tests (JUnit + Mockito)
- [ ] Pagination for large task lists

---

## 👨‍💻 Author

Built as a full-stack backend internship project demonstrating:
- Spring Boot REST API design
- JWT-secured stateless authentication
- JPA/Hibernate ORM with MySQL
- Modern React frontend with premium UI/UX

---

## 📄 License

This project is developed for educational and internship purposes.
Link for the website:
task-management-system-eight-roan.vercel.app

