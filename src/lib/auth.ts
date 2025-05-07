import { apiFetch } from './apiClient';

export async function login(email: string, password: string) {
  const response = await apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  let token = null;
  try {
    const json = await response.json();
    token = json?.token ?? null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    /* empty */
  }

  return {
    ok: response.ok,
    status: response.status,
    token,
  };
}

export async function register(email: string, username: string, password: string) {
  const response = await apiFetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, username, password }),
  });

  return {
    ok: response.ok,
    status: response.status,
  };
}

export async function refreshToken() {
  const response = await apiFetch('/api/auth/refresh', {
    method: 'POST',
  });

  // if (!response.ok) {
  //   // throw new Error('Failed to refresh token');
  //   return response;
  //   }

  return response.json();
}
