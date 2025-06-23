/**
 * User model
 * 
 * Defines the User interface and database operations for users
 */

import { db } from './db';

// User interface based on the database schema
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string; // Optional when returning to client
}

// User model with database operations
export const UserModel = {
  /**
   * Get all users
   * @returns Promise<User[]> List of users with password excluded
   */
  async getAll(): Promise<Omit<User, 'password'>[]> {
    try {
      const result = await db.query(
        'SELECT id, first_name, last_name, email FROM users ORDER BY first_name, last_name'
      );
      return result.rows;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  /**
   * Get user by ID
   * @param id User ID
   * @returns Promise<User> User object with password excluded
   */
  async getById(id: string): Promise<Omit<User, 'password'> | null> {
    try {
      const result = await db.query(
        'SELECT id, first_name, last_name, email FROM users WHERE id = $1',
        [id]
      );
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get user by email
   * @param email User email
   * @returns Promise<User> Complete user object including password
   */
  async getByEmail(email: string): Promise<User | null> {
    try {
      const result = await db.query(
        'SELECT id, first_name, last_name, email, password FROM users WHERE email = $1',
        [email]
      );
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error(`Error fetching user with email ${email}:`, error);
      throw error;
    }
  }
};
