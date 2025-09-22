import { useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function useTokenRefresh() {
  const { refreshToken } = useAuth();

  const handleRefreshToken = useCallback(async () => {
    try {
      await refreshToken();
      console.log('Token refresh successful');
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  }, [refreshToken]);

  return {
    handleRefreshToken,
  };
}