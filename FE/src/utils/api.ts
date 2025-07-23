export const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

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
      let errorData = {};
      try {
        errorData = await response.json();
      } catch {}
      throw {
        status: response.status,
        message: (errorData as any).message || 'Network response was not ok',
        data: errorData,
      };
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
      let errorData = {};
      try {
        errorData = await response.json();
      } catch {}
      throw {
        status: response.status,
        message: (errorData as any).message || 'Request failed',
        data: errorData,
      };
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
      let errorData = {};
      try {
        errorData = await response.json();
      } catch {}
      throw {
        status: response.status,
        message: (errorData as any).message || 'Request failed',
        data: errorData,
      };
    }
    return;
  },
};
