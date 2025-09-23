import { Platform } from 'react-native';
import StorageUtils from '../contexts/StorageUtils';
import { TokenData } from '../types/auth';

export interface StoredTokens {
  accessToken: string | null;
  refreshToken: string | null;
  tokenExpiry: string | null;
}

export class TokenService {
  private static readonly ACCESS_TOKEN_KEY = 'access_token';
  private static readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private static readonly TOKEN_EXPIRY_KEY = 'token_expiry';
  private static readonly AUTH_STATE_KEY = 'auth_state';

  /**
   * Store authentication tokens securely
   */
  static async storeTokens(tokens: TokenData): Promise<void> {
    try {
      await StorageUtils.setItem(this.ACCESS_TOKEN_KEY, tokens.access_token);

      if (tokens.refresh_token) {
        await StorageUtils.setItem(this.REFRESH_TOKEN_KEY, tokens.refresh_token);
      }

      if (tokens.expires_in) {
        const expiry = Date.now() + tokens.expires_in * 1000;
        await StorageUtils.setItem(this.TOKEN_EXPIRY_KEY, expiry.toString());
      }

      console.log('Tokens stored successfully');
    } catch (error) {
      console.error('Failed to store tokens:', error);
      throw new Error('Token storage failed');
    }
  }

  /**
   * Retrieve stored authentication tokens
   */
  static async getStoredTokens(): Promise<StoredTokens> {
    try {
      const [accessToken, refreshToken, tokenExpiry] = await Promise.all([
        StorageUtils.getItem(this.ACCESS_TOKEN_KEY),
        StorageUtils.getItem(this.REFRESH_TOKEN_KEY),
        StorageUtils.getItem(this.TOKEN_EXPIRY_KEY),
      ]);

      return {
        accessToken,
        refreshToken,
        tokenExpiry,
      };
    } catch (error) {
      console.error('Failed to retrieve tokens:', error);
      return {
        accessToken: null,
        refreshToken: null,
        tokenExpiry: null,
      };
    }
  }

  /**
   * Clear all stored authentication data
   */
  static async clearTokens(): Promise<void> {
    try {
      await Promise.all([
        StorageUtils.deleteItem(this.ACCESS_TOKEN_KEY),
        StorageUtils.deleteItem(this.REFRESH_TOKEN_KEY),
        StorageUtils.deleteItem(this.TOKEN_EXPIRY_KEY),
        Platform.OS === 'web' ? StorageUtils.deleteItem(this.AUTH_STATE_KEY) : Promise.resolve(),
      ]);

      console.log('Tokens cleared successfully');
    } catch (error) {
      console.error('Failed to clear tokens:', error);
      throw new Error('Token cleanup failed');
    }
  }

  /**
   * Check if the current access token is expired
   */
  static async isTokenExpired(): Promise<boolean> {
    try {
      const tokenExpiry = await StorageUtils.getItem(this.TOKEN_EXPIRY_KEY);

      if (!tokenExpiry) {
        return true; // No expiry means we should consider it expired
      }

      const expiryTime = parseInt(tokenExpiry, 10);
      const currentTime = Date.now();
      const bufferTime = 60000; // 1 minute buffer

      return currentTime >= (expiryTime - bufferTime);
    } catch (error) {
      console.error('Failed to check token expiry:', error);
      return true; // Default to expired on error
    }
  }

  /**
   * Get the access token if it exists and is not expired
   */
  static async getValidAccessToken(): Promise<string | null> {
    try {
      const isExpired = await this.isTokenExpired();
      if (isExpired) {
        return null;
      }

      return await StorageUtils.getItem(this.ACCESS_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to get valid access token:', error);
      return null;
    }
  }

  /**
   * Store auth state for web platform
   */
  static async storeAuthState(state: string): Promise<void> {
    if (Platform.OS === 'web') {
      try {
        await StorageUtils.setItem(this.AUTH_STATE_KEY, state);
      } catch (error) {
        console.error('Failed to store auth state:', error);
      }
    }
  }

  /**
   * Retrieve and clear auth state for web platform
   */
  static async getAndClearAuthState(): Promise<string | null> {
    if (Platform.OS === 'web') {
      try {
        const state = await StorageUtils.getItem(this.AUTH_STATE_KEY);
        if (state) {
          await StorageUtils.deleteItem(this.AUTH_STATE_KEY);
        }
        return state;
      } catch (error) {
        console.error('Failed to get auth state:', error);
        return null;
      }
    }
    return null;
  }

  /**
   * Force clear all authentication data - useful for debugging or when tokens are corrupted
   */
  static async forceCleanup(): Promise<void> {
    try {
      console.log('Performing force cleanup of all authentication data...');

      // Clear all token-related storage
      await Promise.all([
        StorageUtils.deleteItem(this.ACCESS_TOKEN_KEY),
        StorageUtils.deleteItem(this.REFRESH_TOKEN_KEY),
        StorageUtils.deleteItem(this.TOKEN_EXPIRY_KEY),
        StorageUtils.deleteItem(this.AUTH_STATE_KEY),
      ]);

      // For web platform, also clear any localStorage items that might be related
      if (Platform.OS === 'web') {
        // Clear any potential session storage as well
        try {
          if (typeof sessionStorage !== 'undefined') {
            sessionStorage.clear();
          }
        } catch (e) {
          console.warn('Could not clear session storage:', e);
        }
      }

      console.log('Force cleanup completed successfully');
    } catch (error) {
      console.error('Failed to perform force cleanup:', error);
      throw new Error('Force cleanup failed');
    }
  }
}