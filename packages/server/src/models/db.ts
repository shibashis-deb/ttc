/**
 * Database connection module
 * 
 * This file handles PostgreSQL database connections using environment variables
 * for configuration to support different deployment environments.
 */

import { Pool } from 'pg';

// Create a pool using the connection URL or fallback to individual parameters
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://ttc-db_owner:npg_c9G8zoIqnPEd@ep-small-flower-a863t5i1-pooler.eastus2.azure.neon.tech/ttc-db?sslmode=require',
  ssl: { rejectUnauthorized: false } // Required for Azure/Neon hosted PostgreSQL
});

// Export database interface
export const db = {
  pool,
  isConnected: false,
  
  // Connect to the database
  async connect() {
    try {
      console.log('Attempting to connect to database...');
      console.log(`Connection string: ${process.env.DATABASE_URL ? 'Using environment variable' : 'Using hardcoded URL'}`);
      
      const client = await pool.connect();
      const result = await client.query('SELECT NOW() as now');
      const currentTime = result.rows[0].now;
      client.release();
      
      this.isConnected = true;
      console.log(`Database connection established at ${currentTime}`);
      return true;
    } catch (error: any) {
      console.error('Database connection error:', error.message);
      console.error('Stack trace:', error.stack);
      return false;
    }
  },
  
  // Disconnect from the database
  async disconnect() {
    try {
      await pool.end();
      this.isConnected = false;
      console.log('Database connection closed');
      return true;
    } catch (error) {
      console.error('Error closing database connection:', error);
      return false;
    }
  },
  
  // Execute a query
  async query(text: string, params?: any[]) {
    try {
      return await pool.query(text, params);
    } catch (error) {
      console.error('Query error:', error);
      throw error;
    }
  }
};
