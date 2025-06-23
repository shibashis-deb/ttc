import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config/index.js';
import { db } from './models/db.js';
import apiRoutes from './routes/index.js';
import { initializeDatabase } from './models/initDb.js';

// Initialize Express app
const app = express();
const PORT = config.server.port;

// Setup for __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to client build directory - handle both development and production environments
const clientBuildPath = process.env.NODE_ENV === 'production'
  ? path.join(__dirname, '../client/dist')
  : path.join(__dirname, '../../../packages/client/dist');

console.log(`Client build path: ${clientBuildPath}`);
console.log(`Current directory: ${__dirname}`);

// Middleware
app.use(cors());
app.use(express.json());

// API routes - these should come before static file serving
app.use('/api', apiRoutes);

// API health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running', dbConnected: db.isConnected });
});

// Serve static files from client build
app.use(express.static(clientBuildPath));

// Serve index.html for any routes not handled by API or static files
app.get('*', (req, res) => {
  // Skip API routes
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ message: 'API endpoint not found' });
  }
  
  res.sendFile(path.join(clientBuildPath, 'index.html'));
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
