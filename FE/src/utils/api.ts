export const apiUrl = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem('token');

const authHeaders = (token: string | null) => ({
  'Content-Type': 'application/json',
  ...(token && { Authorization: `Bearer ${token}` }),
});

export const api = {
  get: async (endpoint: string) => {
    const token = getToken();
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: 'GET',
      headers: authHeaders(token),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  post: async (endpoint: string, body: unknown) => {
    const token = getToken();
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Request failed');
    }
    return response.json();
  },

  delete: async (endpoint: string) => {
    const token = getToken();
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: 'DELETE',
      headers: authHeaders(token),
    });
    if (!response.ok && response.status !== 204) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Request failed');
    }
    return;
  },
};
