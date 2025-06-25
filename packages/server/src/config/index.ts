/**
 * Application configuration
 * Loads environment variables with sensible defaults for different environments
 */

// Default configuration values
const DEFAULT_PORT = 8080;
const DEFAULT_DATABASE_URL = 'postgresql://ttc-db_owner:npg_c9G8zoIqnPEd@ep-small-flower-a863t5i1-pooler.eastus2.azure.neon.tech/ttc-db?sslmode=require';

export const config = {
  server: {
    port: process.env.PORT || DEFAULT_PORT,
    nodeEnv: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production'
  },
  database: {
    url: process.env.DATABASE_URL || DEFAULT_DATABASE_URL
  }
};
