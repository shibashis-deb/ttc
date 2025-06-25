import express from "express";
import cookieParser from "cookie-parser";
import { config } from "./config/index.js";
import { db } from "./models/db.js";
import apiRoutes from "./routes/index.js";
import { initializeDatabase } from "./models/initDb.js";

// Initialize Express app
const app = express();

// Regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS middleware - allow all origins for now
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Or set to 'https://ttc-client.onrender.com' for production
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

// API health check route - defined before other API routes to ensure it's accessible
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running", dbConnected: db.isConnected });
});

// API routes
app.use("/api", apiRoutes);
app.get("*", (req, res) => {
  return res.status(404).json({ message: "API endpoint not found" });
});

// Start server
async function startServer() {
  try {
    console.log("Starting server with configuration:");
    console.log(`PORT: ${process.env.PORT}`);
    console.log(`NODE_ENV: ${process.env.NODE_ENV || "development"}`);
    console.log(
      `Database URL: ${process.env.DATABASE_URL ? "(configured)" : "(missing)"}`
    );

    // Connect to database
    const connected = await db.connect();

    if (!connected) {
      throw new Error("Failed to connect to database");
    }

    // Initialize database with tables and sample data
    await initializeDatabase();

    // Start Express server
    app.listen(config.server.port, () => {
      console.log(`Server running on port ${config.server.port}`);
      console.log(`Environment: ${config.server.nodeEnv}`);
      console.log(
        `API available at http://localhost:${config.server.port}/api/users`
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  await db.disconnect();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received, shutting down gracefully");
  await db.disconnect();
  process.exit(0);
});

// Start the server
startServer();
