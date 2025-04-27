const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5135';

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string>,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && path !== '/auth/refresh') {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  return response;
}
