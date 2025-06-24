/**
 * API Types
 * 
 * This file contains type definitions for API requests and responses
 */

/**
 * API configuration
 */
export interface ApiConfig {
  /** Base URL for API requests */
  baseUrl: string;
  /** Default headers to include with all requests */
  defaultHeaders: Record<string, string>;
}

/**
 * API health check response
 */
export interface HealthResponse {
  /** Status message */
  message: string;
  /** Database connection status */
  dbConnected: boolean;
  /** Optional error message */
  error?: string;
}

/**
 * API error response
 */
export interface ApiError {
  /** Error message */
  error: string;
  /** Optional error code */
  code?: string;
  /** Optional error details */
  details?: unknown;
}

/**
 * API request options
 */
export interface ApiRequestOptions extends RequestInit {
  /** Query parameters to append to the URL */
  params?: Record<string, string | number | boolean | undefined | null>;
}
