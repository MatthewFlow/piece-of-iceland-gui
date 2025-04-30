import { useCallback, useEffect, useState } from 'react';

import { refreshToken } from '../lib/auth';

export function useSession() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      setLoading(false);
      return;
    }

    refreshToken()
      .then(data => {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setIsAuthenticated(true);
      })
      .catch(() => {
        localStorage.removeItem('token');
        setToken(null);
        setIsAuthenticated(false);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback((newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
    window.location.href = '/login';
  }, []);

  return {
    token,
    isAuthenticated,
    loading,
    login,
    logout,
  };
}
