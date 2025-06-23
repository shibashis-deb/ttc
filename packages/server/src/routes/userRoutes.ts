/**
 * User Routes
 * 
 * Defines API routes for user operations
 */

import express from 'express';
import { userController } from '../controllers/userController.js';

const router = express.Router();

// GET /api/users - Get all users
router.get('/', userController.getAllUsers);

// GET /api/users/:id - Get user by ID
router.get('/:id', userController.getUserById);

export default router;
