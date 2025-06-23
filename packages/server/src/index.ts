import express from 'express';
import cors from 'cors';
import { config } from './config';
import { db } from './models/db';
import apiRoutes from './routes';
import { initializeDatabase } from './models/initDb';

// Initialize Express app
const app = express();
const PORT = config.server.port;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running', dbConnected: db.isConnected });
});

// API routes
app.use('/api', apiRoutes);

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
