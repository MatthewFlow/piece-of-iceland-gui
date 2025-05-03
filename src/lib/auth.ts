import { apiFetch } from './apiClient';

export async function login(email: string, password: string) {
  const response = await apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  // console.log(response);

  if (!response.ok) {
    return response
    // throw new Error('Invalid credentials');
  }
  return response.json();
}

export async function register(email: string, username: string, password: string) {
  const response = await apiFetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, username, password }),
  });

  if (!response.ok) {
    // throw new Error('Registration failed');
  }

  return response.json();
}

export async function refreshToken() {
  const response = await apiFetch('/api/auth/refresh', {
    method: 'POST',
  });
  // console.log(response);
  if (!response.ok) {
    // throw new Error('Failed to refresh token');
    return response
  }

  return response.json();
}
