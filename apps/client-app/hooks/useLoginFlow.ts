import { useCallback } from 'react';
import { router } from 'expo-router';
import { Platform } from 'react-native';
import { PlatformAuthService } from '../services/platformAuthService';
import { TokenService } from '../services/tokenService';
import { UserService } from '../services/userService';
import { AuthService } from '../services/authService';
import { AuthStateActions } from './useAuthState';

export interface LoginFlowOptions {
  onLoginStart?: () => void;
  onLoginSuccess?: () => void;
  onLoginError?: (error: Error) => void;
}

export function useLoginFlow(actions: AuthStateActions, options: LoginFlowOptions = {}) {
  const { onLoginStart, onLoginSuccess, onLoginError } = options;

  const login = useCallback(async (): Promise<void> => {
    try {
      onLoginStart?.();
      actions.setLoading(true);

      console.log('Starting login flow...');
      await PlatformAuthService.performLogin();

      // After successful login, the tokens should be stored
      // We need to fetch user info and update state
      const storedTokens = await TokenService.getStoredTokens();

      if (storedTokens.accessToken) {
        actions.setTokens(storedTokens.accessToken, storedTokens.refreshToken);

        const userInfo = await UserService.getUserInfo(storedTokens.accessToken);
        if (userInfo) {
          actions.setUser(userInfo);
          console.log('Login successful');
          onLoginSuccess?.();
        } else {
          throw new Error('Failed to fetch user information after login');
        }
      } else {
        throw new Error('No access token received after login');
      }

    } catch (error) {
      console.error('Login failed:', error);
      actions.clearAuthState();
      onLoginError?.(error instanceof Error ? error : new Error('Unknown login error'));
      throw error;
    } finally {
      actions.setLoading(false);
    }
  }, [actions.setLoading, actions.setTokens, actions.setUser, actions.clearAuthState, onLoginStart, onLoginSuccess, onLoginError]);

  const logout = useCallback(async (): Promise<void> => {
    try {
      actions.setLoading(true);

      console.log('Starting logout flow...');

      // Get current tokens for server-side logout
      const storedTokens = await TokenService.getStoredTokens();

      // Perform complete logout (server + local cleanup)
      await AuthService.performLogout({
        accessToken: storedTokens.accessToken || undefined,
        refreshToken: storedTokens.refreshToken || undefined,
      });

      // Clear application state
      actions.clearAuthState();

      // Navigate to login screen
      router.replace('/login' as any);

      // For web, reload to clear any remaining state
      if (Platform.OS === 'web') {
        setTimeout(() => window.location.reload(), 100);
      }

      console.log('Logout completed');

    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, clear local state
      actions.clearAuthState();
      router.replace('/login' as any);
      throw error;
    } finally {
      actions.setLoading(false);
    }
  }, [actions.setLoading, actions.clearAuthState]);

  return {
    login,
    logout,
  };
}