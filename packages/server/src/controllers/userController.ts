/**
 * User Controller
 * 
 * Handles HTTP requests related to users
 */

import { Request, Response } from 'express';
import { UserModel } from '../models/user.js';

export const userController = {
  /**
   * Get all users
   * @param req Express Request
   * @param res Express Response
   */
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserModel.getAll();
      res.json({
        success: true,
        data: users,
        count: users.length
      });
    } catch (error: any) {
      console.error('Error in getAllUsers controller:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve users',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  /**
   * Get user by ID
   * @param req Express Request
   * @param res Express Response
   */
  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await UserModel.getById(id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: `User with ID ${id} not found`
        });
      }
      
      res.json({
        success: true,
        data: user
      });
    } catch (error: any) {
      console.error(`Error in getUserById controller:`, error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve user',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
};
