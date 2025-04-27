import { useEffect } from 'react';

import { refreshToken } from '../lib/auth';

export function useTokenRefresh() {
  useEffect(() => {
    const interval = setInterval(
      async () => {
        const token = localStorage.getItem('token');
        if (!token) return; // Brak tokena ➔ brak odświeżenia

        try {
          await refreshToken();
          console.log('Token refreshed successfully');
        } catch (error) {
          console.error('Failed to refresh token:', error);
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      },
      50 * 60 * 1000
    ); // co 50 minut (czyli trochę przed wygaśnięciem 1h)

    return () => clearInterval(interval);
  }, []);
}
