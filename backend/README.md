# Veritas AI - Backend API Services

This directory houses the core RESTful API endpoints for the Veritas AI Compliance Platform, constructed using Express.js, Prisma, and PostgreSQL.

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or above)
- [PostgreSQL](https://www.postgresql.org/) database server running locally or hosted

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the backend root directory (a pre-configured template is already in place):
```env
PORT=5000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/veritas?schema=public"
JWT_SECRET="veritas_secure_audit_secret_key_2026"
```

### 4. Database Setup & Migrations
Sync your PostgreSQL database instance using Prisma:
```bash
# Generate database client interfaces
npm run prisma:generate

# Run initial migrations
npm run prisma:migrate
```

### 5. Running the API Engine
```bash
# Start in development mode with nodemon
npm run dev

# Start in production mode
npm run start
```

## 🛠️ API Modules & Structure

- `/api/auth`: Handles user workspace registration, validation checkouts, and JWT token outputs.
- `/api/meetings`: Configured with Multer disk pipelines to accept video/audio/document uploads and simulate background AI parsing.
- `/api/reports`: Inspect compliance scores, missing clauses, and transcripts.
- `/api/analytics`: Aggregate statistics and speaker timelines across meeting clusters.
