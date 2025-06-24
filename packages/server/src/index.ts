import express from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import { db } from './models/db.js';
import apiRoutes from './routes/index.js';
import { initializeDatabase } from './models/initDb.js';

// Initialize Express app
const app = express();
const PORT = config.server.port;

// CORS middleware - allow all origins for now
app.use(cors({
  origin: '*',  // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Additional CORS headers as direct Express middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Regular middleware
app.use(express.json());

// API health check route - defined before other API routes to ensure it's accessible
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running', dbConnected: db.isConnected });
});

// API routes
app.use('/api', apiRoutes);
app.get('*', (req, res) => {
  return res.status(404).json({ message: 'API endpoint not found' });
});

// Start server
async function startServer() {
  try {
    console.log('Starting server with configuration:');
    console.log(`PORT: ${PORT}`);
    console.log(`NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Database URL: ${config.database.url ? '(configured)' : '(missing)'}`);
    
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
