import { KEYCLOAK_CONFIG } from '../contexts/authConfig';
import { performCompleteLogout } from '../contexts/keycloakUtils';
import { TokenData } from '../types/auth';
import { TokenService } from './tokenService';
import { exchangeTokenWithFallback } from '../utils/tokenExchange';

export interface AuthCodeExchangePayload {
  code: string;
  redirectUri: string;
  codeVerifier?: string;
}

export interface LogoutOptions {
  accessToken?: string;
  refreshToken?: string;
}

export class AuthService {
  /**
   * Exchange authorization code for access tokens
   */
  static async exchangeCodeForTokens(payload: AuthCodeExchangePayload): Promise<TokenData> {
    const { code, redirectUri, codeVerifier } = payload;

    try {
      const requestPayload: any = { code, redirectUri };
      if (codeVerifier) {
        requestPayload.code_verifier = codeVerifier;
      }

      console.log('Exchanging authorization code for tokens:', {
        code: code.substring(0, 10) + '...',
        redirectUri,
        hasCodeVerifier: !!codeVerifier,
      });

      const response = await fetch(
        `${KEYCLOAK_CONFIG.authServerUrl}/auth/exchange`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(requestPayload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Code exchange failed:', errorData);
        throw new Error(errorData.error || 'Authorization code exchange failed');
      }

      const tokens: TokenData = await response.json();

      if (!tokens.access_token) {
        throw new Error('No access token received from code exchange');
      }

      console.log('Code exchange successful');
      return tokens;

    } catch (error) {
      console.error('Code exchange error:', error);
      throw error;
    }
  }

  /**
   * Refresh access token using refresh token
   */
  static async refreshAccessToken(): Promise<TokenData> {
    try {
      const storedTokens = await TokenService.getStoredTokens();
      const refreshToken = storedTokens.refreshToken;

      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      console.log('Refreshing access token...');

      const response = await fetch(
        `${KEYCLOAK_CONFIG.authServerUrl}/auth/refresh`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ refresh_token: refreshToken }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Token refresh failed:', errorData);
        throw new Error(errorData.error || 'Token refresh failed');
      }

      const tokens: TokenData = await response.json();

      if (!tokens.access_token) {
        throw new Error('No access token received from refresh');
      }

      console.log('Token refresh successful');
      return tokens;

    } catch (error) {
      console.error('Token refresh error:', error);
      throw error;
    }
  }

  /**
   * Exchange current token for device dashboard token
   */
  static async exchangeTokenForDeviceDashboard(currentToken: string): Promise<string> {
    if (!currentToken) {
      throw new Error('Current token is required for exchange');
    }

    try {
      console.log('Exchanging token for device dashboard...');
      const deviceDashboardToken = await exchangeTokenWithFallback(currentToken, 'device-dashboard');
      console.log('Device dashboard token exchange successful');
      return deviceDashboardToken;
    } catch (error) {
      console.error('Device dashboard token exchange failed:', error);
      throw error;
    }
  }

  /**
   * Perform complete logout including server-side cleanup
   */
  static async performLogout(options: LogoutOptions = {}): Promise<void> {
    const { accessToken, refreshToken } = options;

    try {
      if (accessToken || refreshToken) {
        console.log('Performing server-side logout...');
        await performCompleteLogout(
          KEYCLOAK_CONFIG.authServerUrl,
          KEYCLOAK_CONFIG,
          {
            accessToken,
            refreshToken,
          }
        );
        console.log('Server-side logout completed');
      }
    } catch (error) {
      console.error('Server-side logout error:', error);
      // Don't throw here - we still want to clear local tokens
    }

    // Always clear local tokens regardless of server-side logout success
    try {
      await TokenService.clearTokens();
      console.log('Local tokens cleared');
    } catch (error) {
      console.error('Failed to clear local tokens:', error);
      throw error;
    }
  }

  /**
   * Check server connectivity
   */
  static async checkServerConnectivity(): Promise<boolean> {
    try {
      console.log('Testing server connectivity...');
      const response = await fetch(
        `${KEYCLOAK_CONFIG.authServerUrl}/health`,
        {
          method: 'GET',
        }
      );

      const isConnected = response.ok;
      console.log('Server connectivity check:', isConnected ? 'SUCCESS' : 'FAILED', response.status);

      return isConnected;
    } catch (error) {
      console.error('Server connectivity check failed:', error);
      return false;
    }
  }

  /**
   * Get authentication server health information
   */
  static async getServerHealth(): Promise<any> {
    try {
      const response = await fetch(
        `${KEYCLOAK_CONFIG.authServerUrl}/health`,
        {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
        }
      );

      if (!response.ok) {
        throw new Error(`Server health check failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to get server health:', error);
      throw error;
    }
  }
}