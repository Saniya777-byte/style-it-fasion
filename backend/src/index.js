const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const meetingRoutes = require("./routes/meeting.routes");
const reportRoutes = require("./routes/report.routes");
const analyticsRoutes = require("./routes/analytics.routes");

const app = express();
const PORT = process.env.PORT || 5000;

// Config CORS
app.use(
  cors({
    origin: "*", // allow all origin, adjust for production if needed
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded assets
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
  console.error("Global error handler caught exception:", err);
  res.status(err.status || 500).json({
    message: err.message || "An unexpected error occurred in Veritas API",
  });
});

app.listen(PORT, () => {
  console.log(`[Veritas Engine] API running successfully on port ${PORT}`);
});
