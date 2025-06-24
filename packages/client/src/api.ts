import { API_URL } from './utils/env';
import type { ApiRequestOptions, HealthResponse, ApiError } from './types/api';

/**
 * Simple API client for making requests to the backend
 */

/**
 * Base function for making API requests
 * @param endpoint - API endpoint (without leading slash)
 * @param options - Fetch options
 * @returns Response data
 */
const apiRequest = async <T>(endpoint: string, options: ApiRequestOptions = {}): Promise<T> => {
  try {
    // Construct URL with query parameters if provided
    let url = `${API_URL}/api/${endpoint}`;
    
    if (options.params) {
      const queryParams = new URLSearchParams();
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
      
      const queryString = queryParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }
    
    // Make the request
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      // Try to parse error response
      let errorData: ApiError;
      try {
        errorData = await response.json();
      } catch {
        errorData = { error: `API Error: ${response.status} ${response.statusText}` };
      }
      throw errorData;
    }
    
    return await response.json() as T;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

/**
 * Test the API connection
 * @returns Health check response
 */
export const testApi = async (): Promise<HealthResponse> => {
  try {
    return await apiRequest<HealthResponse>('health');
  } catch (error) {
    console.error('Health API Error:', error);
    return { message: 'Failed to connect to API', dbConnected: false, error: String(error) };
  }
};
