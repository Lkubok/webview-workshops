import { KEYCLOAK_CONFIG } from '../contexts/authConfig';
import { performCompleteLogout } from '../contexts/keycloakUtils';
import { TokenService } from './tokenService';

export interface LogoutOptions {
  accessToken?: string;
  refreshToken?: string;
}

export class LogoutService {
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
}