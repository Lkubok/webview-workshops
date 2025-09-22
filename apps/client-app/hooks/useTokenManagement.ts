import { useCallback, useEffect } from 'react';
import { AuthService } from '../services/authService';
import { TokenService } from '../services/tokenService';
import { UserService } from '../services/userService';
import { AuthStateActions } from './useAuthState';

export interface TokenManagementOptions {
  onTokenRefreshSuccess?: () => void;
  onTokenRefreshError?: (error: Error) => void;
  autoRefreshEnabled?: boolean;
}

export function useTokenManagement(
  actions: AuthStateActions,
  options: TokenManagementOptions = {}
) {
  const {
    onTokenRefreshSuccess,
    onTokenRefreshError,
    autoRefreshEnabled = true
  } = options;

  const refreshAccessToken = useCallback(async (): Promise<void> => {
    try {
      console.log('Refreshing access token...');

      const tokens = await AuthService.refreshAccessToken();
      await TokenService.storeTokens(tokens);

      // Update state with new tokens
      actions.setTokens(tokens.access_token, tokens.refresh_token || null);

      // Fetch updated user info
      const userInfo = await UserService.getUserInfo(tokens.access_token);
      if (userInfo) {
        actions.setUser(userInfo);
      }

      console.log('Token refresh successful');
      onTokenRefreshSuccess?.();

    } catch (error) {
      console.error('Token refresh failed:', error);
      onTokenRefreshError?.(error instanceof Error ? error : new Error('Token refresh failed'));

      // If refresh fails, user needs to login again
      actions.clearAuthState();
      throw error;
    }
  }, [actions.setTokens, actions.setUser, actions.clearAuthState, onTokenRefreshSuccess, onTokenRefreshError]);

  const exchangeTokenForDeviceDashboard = useCallback(async (currentToken: string): Promise<string> => {
    try {
      return await AuthService.exchangeTokenForDeviceDashboard(currentToken);
    } catch (error) {
      console.error('Device dashboard token exchange failed:', error);
      throw error;
    }
  }, []);

  const loadStoredAuth = useCallback(async (): Promise<void> => {
    try {
      actions.setLoading(true);

      const storedTokens = await TokenService.getStoredTokens();
      const { accessToken, refreshToken } = storedTokens;

      if (accessToken && refreshToken) {
        actions.setTokens(accessToken, refreshToken);

        // Check if token is expired
        const isExpired = await TokenService.isTokenExpired();

        if (isExpired) {
          console.log('Stored token is expired, attempting refresh...');
          await refreshAccessToken();
          return;
        }

        // Try to get user info with current token
        const userInfo = await UserService.getUserInfo(accessToken);

        if (userInfo) {
          actions.setUser(userInfo);
          console.log('Restored authentication state from storage');
        } else {
          // Token might be invalid, try to refresh
          console.log('Failed to get user info, attempting token refresh...');
          await refreshAccessToken();
        }
      } else {
        console.log('No stored authentication found');
        actions.clearAuthState();
      }

    } catch (error) {
      console.error('Failed to load stored authentication:', error);
      actions.clearAuthState();
      // Don't throw here - this is initial load
    } finally {
      actions.setLoading(false);
    }
  }, [actions.setLoading, actions.setTokens, actions.setUser, actions.clearAuthState, refreshAccessToken]);

  const checkTokenValidity = useCallback(async (): Promise<boolean> => {
    try {
      const storedTokens = await TokenService.getStoredTokens();

      if (!storedTokens.accessToken) {
        return false;
      }

      const isExpired = await TokenService.isTokenExpired();
      return !isExpired;

    } catch (error) {
      console.error('Failed to check token validity:', error);
      return false;
    }
  }, []);

  // Auto-refresh token when it's about to expire
  useEffect(() => {
    if (!autoRefreshEnabled) return;

    const interval = setInterval(async () => {
      try {
        const isValid = await checkTokenValidity();
        if (!isValid) {
          // Token is invalid/expired, try to refresh
          const storedTokens = await TokenService.getStoredTokens();
          if (storedTokens.refreshToken) {
            console.log('Auto-refreshing token...');
            await refreshAccessToken();
          }
        }
      } catch (error) {
        console.error('Auto token refresh failed:', error);
      }
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(interval);
  }, [autoRefreshEnabled, checkTokenValidity, refreshAccessToken]);

  return {
    refreshToken: refreshAccessToken,
    exchangeTokenForDeviceDashboard,
    loadStoredAuth,
    checkTokenValidity,
  };
}