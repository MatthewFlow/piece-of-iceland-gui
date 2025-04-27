const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5135';

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  // Auto refresh token if expired (optionally here)
  if (response.status === 401 && path !== '/auth/refresh') {
    // 401 Unauthorized — możesz tu zaimplementować automatyczny refresh
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  return response;
}
