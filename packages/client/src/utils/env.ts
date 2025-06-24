/**
 * Environment variables utility
 * 
 * This file provides typed access to environment variables configured in vite.config.ts
 */

/**
 * API URL for backend services
 * In production: https://ttc-api-ybui.onrender.com
 * In development: http://localhost:5000
 */
export const API_URL = import.meta.env.VITE_API_URL;

/**
 * Current environment (development or production)
 */
export const NODE_ENV = import.meta.env.MODE;

/**
 * Check if the app is running in production mode
 */
export const isProduction = import.meta.env.PROD;

/**
 * Check if the app is running in development mode
 */
export const isDevelopment = import.meta.env.DEV;
