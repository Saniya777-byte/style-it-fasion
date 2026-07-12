const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
require("dotenv").config();

const secureHeaders = require("./middleware/security.middleware");
const { limitRequests } = require("./middleware/rateLimit.middleware");
const prisma = require("./config/database");

const authRoutes = require("./routes/auth.routes");
const meetingRoutes = require("./routes/meeting.routes");
const reportRoutes = require("./routes/report.routes");
const analyticsRoutes = require("./routes/analytics.routes");

const app = express();
const PORT = process.env.PORT || 5000;

// Apply OWASP Security Headers
app.use(secureHeaders);

// Apply Global Rate Limiting (300 requests per 15 minutes per IP)
app.use(limitRequests(300, 15));

// Configure CORS Allowlists
const allowedOrigins = [];

if (process.env.CLIENT_URL) {
  allowedOrigins.push(...process.env.CLIENT_URL.split(",").map(url => url.trim()));
}

if (process.env.ALLOWED_ORIGINS) {
  allowedOrigins.push(...process.env.ALLOWED_ORIGINS.split(",").map(url => url.trim()));
}

const isDev = process.env.NODE_ENV !== "production";

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server or script requests (no origin)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow localhost during development
      if (isDev) {
        try {
          const url = new URL(origin);
          if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
            return callback(null, true);
          }
        } catch (e) {
          // invalid URL parsing fallback
        }
      }

      return callback(new Error("Blocked by CORS Policy: Requesting origin not allowed."));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded assets securely
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// API subroutes
app.use("/api/auth", authRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/analytics", analyticsRoutes);

// Production-friendly root route
app.get("/", (req, res) => {
  res.json({
    success: true,
    service: "Veritas AI API",
    status: "running",
    version: "1.0.0"
  });
});

// Basic API information route
app.get("/api", (req, res) => {
  res.json({
    success: true,
    service: "Veritas AI API",
    version: "1.0.0",
    description: "API Gateway for Veritas AI compliance platform",
    endpoints: {
      auth: "/api/auth",
      meetings: "/api/meetings",
      reports: "/api/reports",
      analytics: "/api/analytics",
      health: "/api/health"
    }
  });
});

// Verify Prisma connection and health route
app.get("/api/health", async (req, res) => {
  let databaseStatus = "disconnected";
  let success = false;
  let status = "unhealthy";

  try {
    // Perform simple query to verify connection
    await prisma.$queryRaw`SELECT 1`;
    databaseStatus = "connected";
    success = true;
    status = "healthy";
  } catch (error) {
    console.error("Database connection verification failed:", error.message || error);
    databaseStatus = "disconnected";
    success = false;
    status = "unhealthy";
  }

  const response = {
    success,
    status,
    database: databaseStatus,
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  };

  if (success) {
    res.json(response);
  } else {
    res.status(503).json(response);
  }
});

// Maintain legacy /health route for backward compatibility
app.get("/health", async (req, res) => {
  let databaseStatus = "disconnected";
  try {
    await prisma.$queryRaw`SELECT 1`;
    databaseStatus = "connected";
  } catch (error) {}
  
  res.json({
    status: databaseStatus === "connected" ? "healthy" : "unhealthy",
    timestamp: new Date()
  });
});

// Custom 404 Route handler
app.use((req, res, next) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
});

// Global error boundaries
app.use((err, req, res, next) => {
  // If it's a CORS policy error
  if (err.message && err.message.includes("Blocked by CORS Policy")) {
    return res.status(403).json({ message: err.message });
  }

  // Handle Multer upload exceptions cleanly
  if (err instanceof multer.MulterError) {
    let message = "File upload failure";
    if (err.code === "LIMIT_FILE_SIZE") {
      message = "File exceeds the maximum upload limit of 100MB";
    }
    return res.status(400).json({ message });
  }

  // Handle Prisma Database connection or validation errors cleanly
  if (err.name && err.name.includes("Prisma")) {
    console.error("Prisma Database Error:", err.message || err);
    return res.status(503).json({
      message: "Database service is temporarily unavailable or misconfigured."
    });
  }

  console.error("Global error handler caught exception:", err.message || err);

  res.status(err.status || 500).json({
    message: err.status ? err.message : "An unexpected error occurred in Veritas API",
  });
});

app.listen(PORT, () => {
  console.log(`[Veritas Engine] API running successfully on port ${PORT}`);
});
