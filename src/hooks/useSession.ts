import { useEffect, useState } from 'react';

import { refreshToken } from '../lib/auth';

export function useSession() {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initializeSession() {
      try {
        const storedToken = localStorage.getItem('token');

        if (storedToken) {
          await refreshToken();
          setToken(localStorage.getItem('token'));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Session expired, logging out');
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    initializeSession();
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return { token, isAuthenticated, loading, login, logout };
}
