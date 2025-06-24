import express from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import { db } from './models/db.js';
import apiRoutes from './routes/index.js';
import { initializeDatabase } from './models/initDb.js';

// Initialize Express app
const app = express();
const PORT = config.server.port;

// CORS middleware with dynamic origin handling
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://ttc-client.onrender.com'
];

app.use(cors({
  origin: function(origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      // Origin allowed
      callback(null, true);
    } else {
      // For development/testing, allow all origins
      // In production, you might want to be more restrictive
      callback(null, true);
      
      // To restrict origins, uncomment this instead:
      // callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Regular middleware
app.use(express.json());

// API routes - these should come before static file serving
app.use('/api', apiRoutes);

// API health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running', dbConnected: db.isConnected });
});
app.get('*', (req, res) => {
  return res.status(404).json({ message: 'API endpoint not found' });
});

// Start server
async function startServer() {
  try {
    // Connect to database
    const connected = await db.connect();
    
    if (!connected) {
      throw new Error('Failed to connect to database');
    }
    
    // Initialize database with tables and sample data
    await initializeDatabase();
    
    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`API available at http://localhost:${PORT}/api/users`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  await db.disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  await db.disconnect();
  process.exit(0);
});

// Start the server
startServer();
