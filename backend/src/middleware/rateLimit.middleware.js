const rateLimitsStore = {};

const limitRequests = (limitCount = 100, windowMinutes = 15) => {
  const windowMs = windowMinutes * 60 * 1000;

  return (req, res, next) => {
    // Get unique identifier (client IP)
    const ip = req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress || "anonymous";
    const now = Date.now();

    if (!rateLimitsStore[ip]) {
      rateLimitsStore[ip] = [];
    }

    // Clean up older timestamps outside the tracking window
    rateLimitsStore[ip] = rateLimitsStore[ip].filter((timestamp) => now - timestamp < windowMs);

    if (rateLimitsStore[ip].length >= limitCount) {
      return res.status(429).json({
        message: `Too many requests from this IP. Please try again after ${windowMinutes} minutes.`,
      });
    }

    rateLimitsStore[ip].push(now);
    next();
  };
};

module.exports = { limitRequests };
