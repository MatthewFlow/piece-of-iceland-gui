export async function refreshToken() {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token available');

  const response = await fetch('/api/auth/refresh', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  const data = await response.json();
  localStorage.setItem('token', data.token);
}
