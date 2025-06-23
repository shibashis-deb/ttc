/**
 * API Routes
 * 
 * Central file that combines all API routes
 */

import express from 'express';
import userRoutes from './userRoutes';

const router = express.Router();

// Health check endpoint
router.get('/health', async (req, res) => {
  try {
    const { db } = await import('../models/db');
    const result = await db.query('SELECT NOW()');
    res.json({ 
      status: 'ok', 
      message: 'Database connection is healthy',
      timestamp: result.rows[0].now
    });
  } catch (error: any) {
    console.error('Health check failed:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Database connection failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// User routes
router.use('/users', userRoutes);

export default router;
