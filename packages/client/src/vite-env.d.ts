/// <reference types="vite/client" />

/**
 * Type declarations for Vite environment variables
 * These provide type safety and autocompletion for environment variables
 * defined in .env files or in vite.config.ts
 */
interface ImportMetaEnv {
  /**
   * API URL for backend services
   * Development: http://localhost:5000
   * Production: https://ttc-api-ybui.onrender.com
   */
  readonly VITE_API_URL: string;

  // Add more environment variables as needed
}

/**
 * Extends the ImportMeta interface from Vite
 */
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
