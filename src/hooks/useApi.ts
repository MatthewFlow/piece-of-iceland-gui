import { useState } from 'react';

import { apiFetch } from '../lib/apiClient';

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function request<T>(path: string, options: RequestInit = {}): Promise<T | null> {
    setLoading(true);
    setError(null);

    try {
      const response = await apiFetch(path, options);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Unknown error');
      }
      const data = await response.json();
      return data as T;
    } catch (err: any) {
      setError(err.message || 'API error');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { request, loading, error };
}
