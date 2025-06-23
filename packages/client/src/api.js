// Simple API client
export const testApi = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/test');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return { error: 'Failed to connect to API' };
  }
};
