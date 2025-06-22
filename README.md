# Budget Tracker Backend

This project is a backend REST API for a budget tracking application. It allows users to manage their budgets, transactions, and categories, and provides summary reports. The backend is built with Node.js, Express, Sequelize ORM, and PostgreSQL.

## Features

- User authentication (JWT-based)
- CRUD operations for transactions and categories
- Set and retrieve monthly budgets
- Get summary reports for spending and income
- Secure endpoints with authentication middleware

## REST API & Routing

All API endpoints are prefixed with `/api/`. The main routes are:

- **Auth**:

  - `POST /api/auth/register` — Register a new user
  - `POST /api/auth/login` — Login and receive a JWT token

- **Transactions**:

  - `POST /api/transactions/` — Create a transaction
  - `GET /api/transactions/` — List transactions (with filters)
  - `DELETE /api/transactions/:id` — Delete a transaction

- **Categories**:

  - `POST /api/categories/` — Create a category
  - `GET /api/categories/` — List categories

- **Budget**:

  - `POST /api/budget/` — Set a monthly budget
  - `GET /api/budget/` — Get the budget for a month

- **Summary**:
  - `GET /api/summary/` — Get income/expense summary for a month or year

All routes (except `/api/auth/*`) require a valid JWT token in the `Authorization` header.

## Installation

1. **Clone the repository**

   ```sh
   git clone <your-repo-url>
   cd budget-tracker-backend

   ```

2. **Install dependencies**

   ```sh
   npm install

   ```

3. **Configure environment variables**

Copy .env.example to .env and fill in your database and JWT secret:

```
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
JWT_SECRET=your_jwt_secret
```

4. **Start the server**

```sh
npm run dev
```

**Important Environment Variables**

- DB_NAME — Name of your PostgreSQL database
- DB_USER — Database username
- DB_PASSWORD — Database password
- DB_HOST — Database host (e.g., localhost)
- JWT_SECRET — Secret key for signing JWT tokens

**Project Structure**

- controllers/ — Route handler logic
- models/ — Sequelize models and associations
- routes/ — Express route definitions
- middlewares/ — Authentication middleware
- server.js — Entry point
