import { refreshToken } from './auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5135';

async function fetchWithAuth(
  path: string,
  options: RequestInit = {},
  retry = true
): Promise<Response> {
  const token = localStorage.getItem('token');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && retry && path !== '/api/auth/refresh') {
    try {
      console.warn('Token expired. Attempting to refresh...');
      await refreshToken();
      return fetchWithAuth(path, options, false);
    } catch (refreshError) {
      console.error('Failed to refresh token. Logging out.');
      localStorage.removeItem('token');
      window.location.href = '/login';
      throw new Error('Session expired');
    }
  }

  return response;
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  return fetchWithAuth(path, options);
}
