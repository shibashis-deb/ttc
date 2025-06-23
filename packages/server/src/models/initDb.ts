/**
 * Database initialization script
 * 
 * Creates tables and inserts initial data if they don't exist
 */

import { db } from './db';

export async function initializeDatabase() {
  try {
    console.log('Initializing database...');
    
    // Check if users table exists
    const tableCheck = await db.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      );
    `);
    
    const tableExists = tableCheck.rows[0].exists;
    
    if (!tableExists) {
      console.log('Creating users table...');
      
      // Create users table
      await db.query(`
        CREATE TABLE users (
          id TEXT DEFAULT gen_random_uuid() PRIMARY KEY,
          first_name VARCHAR(50) NOT NULL,
          last_name VARCHAR(50) NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          password VARCHAR(20) NOT NULL
        );
      `);
      
      console.log('Users table created successfully');
      
      // Insert sample data
      console.log('Inserting sample data...');
      await db.query(`
        INSERT INTO users (first_name, last_name, email, password)
        VALUES 
          ('John', 'Doe', 'john.doe@email.com', 'Test@123'),
          ('Jane', 'Doe', 'jane.doe@email.com', 'Test@123');
      `);
      
      console.log('Sample data inserted successfully');
    } else {
      console.log('Users table already exists');
    }
    
    // Verify data
    const userCount = await db.query('SELECT COUNT(*) FROM users');
    console.log(`Database initialized with ${userCount.rows[0].count} users`);
    
    return true;
  } catch (error: any) {
    console.error('Failed to initialize database:', error.message);
    console.error('Stack trace:', error.stack);
    return false;
  }
}
