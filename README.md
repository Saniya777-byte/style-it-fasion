# Veritas AI — Meeting Management & Compliance Platform

Veritas AI is a secure, enterprise-grade AI-powered meeting governance and compliance platform. The application ingests corporate meeting records (video or audio), performs automated natural language transcription, audits conversational content against global compliance frameworks (such as GDPR, SOC 2, HIPAA, and custom rules), and generates certified executive summaries and speaking analytics.

---

## 📸 Screenshots

> [!NOTE]
> Update these paths once active screenshots are generated on your production hosting instance.

| Executive Dashboard (Light Mode) | Compliance Audits (Dark Mode) |
| --- | --- |
| ![Dashboard Light Mode](https://via.placeholder.com/600x350?text=Executive+Dashboard+Light+Mode) | ![Compliance Log Dark Mode](https://via.placeholder.com/600x350?text=Compliance+Log+Dark+Mode) |

---

## ✨ Features

- **Ingestion Pipeline**: Drag-and-drop secure media upload supporting multiple file formats (MP3, WAV, MP4) with size and duration auditing.
- **Whisper AI Diarization**: Multi-speaker transcription that isolates speaker channels, cleans noise patterns, and provides speech-to-text outputs.
- **Regulatory Scan Engine**: Automatic audit engine checks conversations for security vulnerabilities, PII leaks, access role violations, or GDPR/SOC 2 exposure.
- **Action-Item Harvesting**: Automates the extraction of corporate action-items, assignees, deadlines, and core decision trees from raw dialogue structures.
- **Vocal Tone & Speaker Dynamics**: Analytics detailing speaker percentage distribution, speaking speeds (words per minute), and sentiment/tone patterns.
- **Certified Downloads**: Download verified audit assets in PDF or structured JSON for corporate record keeping.
- **Dual Theme Support**: Beautiful typography hierarchy, subtle micro-animations (Framer Motion), and seamless transitions between Dark and Light interfaces.

---

## 🛠️ Tech Stack

### Frontend Client
- **Core Framework**: React 19 & Next.js 15 (App Router, Static & Server rendering)
- **Styling**: Tailwind CSS v4 & custom modern utilities
- **Animations**: Framer Motion (staggered scroll reveals, floating elements, layout transitions)
- **Icons**: Lucide React
- **Client Networking**: Axios with unified interceptors

### Backend Server
- **Runtime & framework**: Node.js & Express.js
- **Database ORM**: Prisma Client
- **Database Server**: PostgreSQL
- **Media Upload Processing**: Multer middleware disk storage
- **Authentication**: JSON Web Tokens (JWT) & bcrypt hashing
- **Security & Limits**: Helmet, CORS, and Express rate limiting

---

## 📐 Architecture Overview

Veritas AI follows a clean, decoupled architecture:

```mermaid
graph TD
    A[Client App: Next.js] -->|HTTPS Requests| B[API Gateway / Express Server]
    B -->|Middleware: Auth / RateLimit / Security| C[Route Handlers]
    C -->|Upload Engine: Multer| D[Uploads Directory]
    C -->|Controllers| E[Service & Mock Processing Layer]
    E -->|Database ORM: Prisma| F[(PostgreSQL Database)]
```

---

## 📁 Folder Structure

```
style-it-fasion/
├── backend/
│   ├── prisma/
│   │   ├── migrations/         # DB migrations SQL files
│   │   └── schema.prisma      # DB model design definition
│   ├── src/
│   │   ├── config/            # Server configs (Prisma/Express)
│   │   ├── controllers/       # Route action implementation controllers
│   │   ├── middleware/        # Security, Auth & Rate Limiting filters
│   │   ├── routes/            # Express router paths
│   │   ├── utils/             # Database generators & mock parsers
│   │   └── index.js           # Server application bootstrapper
│   ├── package.json
│   └── README.md              # (REMOVED: consolidated)
├── frontend/
│   ├── public/                # Static assets, logos & patterns
│   ├── src/
│   │   ├── app/               # Next.js App Router (Layouts & Pages)
│   │   ├── components/        # Reusable UI controls, layout parts, charts
│   │   ├── constants/         # Route & config variables
│   │   ├── services/          # Client API calls (meeting, reports, etc.)
│   │   └── utils/             # CSS & helper utilities
│   ├── package.json
│   └── README.md              # (REMOVED: consolidated)
├── README.md                  # Comprehensive root documentation
└── test-meeting.txt           # Test conversation script
```

---

## 🔄 Project Workflows

### User Journey Workflow
```mermaid
sequenceDiagram
    participant U as User
    participant F as Next.js Client
    participant B as Express Server
    participant DB as PostgreSQL (Prisma)

    U->>F: Log In / Register Account
    F->>B: POST /api/auth/login
    B->>DB: Query user records
    DB-->>B: User details
    B-->>F: Return JWT Token
    F->>U: Grant Dashboard Access
    U->>F: Upload Meeting File & Select Framework
    F->>B: POST /api/meetings (with Multer payload)
    B-->>F: Return Meeting Object (Status: Processing)
    F->>U: Show Auditing Timeline Page
    Note over B: Background AI parsing & compliance score generation
    B->>DB: Save Report, Risks, Missing Clauses
    U->>F: Access Interactive Report Viewer
    F->>B: GET /api/reports/:id
    B-->>F: Report object with compliance telemetry
    F->>U: Render tabs, risk alerts, and charts
```

### AI Processing Workflow
```mermaid
graph LR
    A[Raw Media Upload] --> B[Whisper Speech-to-Text]
    B --> C[Speaker Diarization]
    C --> D[Regulatory Violation Parsing]
    D --> E[GDPR / SOC 2 Clause Audit]
    E --> F[Action Item Extraction]
    F --> G[Certified Report Assembly]
    G --> H[Telemetry Metrics Store]
```

---

## 🗄️ Database Schema Overview

```prisma
model User {
  id        String    @id @default(uuid())
  name      String
  email     String    @unique
  password  String
  company   String
  role      String    @default("Compliance Officer")
  meetings  Meeting[]
}

model Meeting {
  id                  String   @id @default(uuid())
  title               String
  company             String
  date                DateTime @default(now())
  duration            String
  fileSize            String
  fileName            String
  filePath            String
  status              String   @default("Processing")
  language            String
  country             String
  complianceFramework String
  userId              String
  user                User     @relation(...)
  report              Report?
}

model Report {
  id              String          @id @default(uuid())
  meetingId       String          @unique
  meeting         Meeting         @relation(...)
  complianceScore Int?
  transcript      String          @db.Text
  aiSummary       String          @db.Text
  risks           Risk[]
  missingClauses  MissingClause[]
  speakerStats    SpeakerStat[]
  topicDists      TopicDist[]
  timelines       SpeakingTimeline[]
}

model Risk {
  id          String   @id @default(uuid())
  reportId    String
  report      Report   @relation(...)
  severity    String   // "high" | "medium" | "low"
  clause      String
  description String   @db.Text
  timestamp   String
}

model MissingClause {
  id          String   @id @default(uuid())
  reportId    String
  report      Report   @relation(...)
  clause      String
  description String   @db.Text
  mitigation  String   @db.Text
}
```

---

## 🔌 API Reference

### Authentication
- `POST /api/auth/register` - Create user compliance profile.
- `POST /api/auth/login` - Verify user credentials and return JWT Token.
- `GET /api/auth/me` - Fetch profile metadata for authenticated session.

### Meetings
- `POST /api/meetings` - Ingest raw media files (Multer multi-part) and kickstart background compilation.
- `GET /api/meetings` - Fetch user's meeting archive.
- `GET /api/meetings/:id` - Fetch single meeting state.

### Reports
- `GET /api/reports/:id` - Retrieve compliance telemetry, transcripts, and identified risk records.

### Analytics
- `GET /api/analytics` - Fetch aggregates for user/company compliance metrics over time.

---

## ⚙️ Environment Variables

### Backend Server Configurations
Create `backend/.env`:
```env
PORT=5000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/veritas?schema=public"
JWT_SECRET="veritas_secure_audit_secret_key_2026"
```

### Frontend Client Configurations
Create `frontend/.env.local` (optional):
```env
NEXT_PUBLIC_API_URL="http://localhost:5000"
```

---

## 🚀 Getting Started

### 1. Database Initialization
Ensure a PostgreSQL server instance is active. In `backend/`:
```bash
# Install dependencies
npm install

# Run database schema migrations
npm run prisma:migrate

# Generate prisma DB client interfaces
npm run prisma:generate
```

### 2. Launch Development Servers

#### Booting the API Engine (in `backend/`):
```bash
npm run dev
```

#### Booting the Next.js Client (in `frontend/`):
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) on your local browser to access Veritas AI.