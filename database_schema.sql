CREATE DATABASE IF NOT EXISTS task_db;
USE task_db;

-- =============================================
-- TABLE: users
-- Stores registered user accounts
-- =============================================
CREATE TABLE IF NOT EXISTS users (
    id       BIGINT AUTO_INCREMENT PRIMARY KEY,
    name     VARCHAR(255) NOT NULL,
    email    VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role     VARCHAR(50)  NOT NULL DEFAULT 'USER'
);

-- =============================================
-- TABLE: tasks
-- Stores tasks belonging to users
-- =============================================
CREATE TABLE IF NOT EXISTS tasks (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(255)  NOT NULL,
    description VARCHAR(1000),
    status      VARCHAR(50)   NOT NULL DEFAULT 'PENDING',
    created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id     BIGINT        NOT NULL,
    CONSTRAINT fk_tasks_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- =============================================
-- Note: Spring Boot (ddl-auto=update) will
-- automatically create / sync these tables.
-- Run this script only for a clean initial setup.
-- =============================================
