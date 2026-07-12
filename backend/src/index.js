const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
require("dotenv").config();

const secureHeaders = require("./middleware/security.middleware");
const { limitRequests } = require("./middleware/rateLimit.middleware");

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
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:3000", "http://localhost:3001"];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server or script requests (no origin)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes("*")) {
        return callback(null, true);
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

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date() });
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

  console.error("Global error handler caught exception:", err.message || err);

  res.status(err.status || 500).json({
    message: err.status ? err.message : "An unexpected error occurred in Veritas API",
  });
});

app.listen(PORT, () => {
  console.log(`[Veritas Engine] API running successfully on port ${PORT}`);
});
