import { TokenOperationsService, AuthCodeExchangePayload } from './tokenOperationsService';
import { ServerHealthService } from './serverHealthService';
import { LogoutService, LogoutOptions } from './logoutService';
import { TokenData } from '../types/auth';

export { AuthCodeExchangePayload, LogoutOptions };

export class AuthService {
  /**
   * Exchange authorization code for access tokens
   */
  static async exchangeCodeForTokens(payload: AuthCodeExchangePayload): Promise<TokenData> {
    return TokenOperationsService.exchangeCodeForTokens(payload);
  }

  /**
   * Refresh access token using refresh token
   */
  static async refreshAccessToken(): Promise<TokenData> {
    return TokenOperationsService.refreshAccessToken();
  }

  /**
   * Exchange current token for device dashboard token
   */
  static async exchangeTokenForDeviceDashboard(currentToken: string): Promise<string> {
    return TokenOperationsService.exchangeTokenForDeviceDashboard(currentToken);
  }

  /**
   * Perform complete logout including server-side cleanup
   */
  static async performLogout(options: LogoutOptions = {}): Promise<void> {
    return LogoutService.performLogout(options);
  }

  /**
   * Check server connectivity
   */
  static async checkServerConnectivity(): Promise<boolean> {
    return ServerHealthService.checkServerConnectivity();
  }

  /**
   * Get authentication server health information
   */
  static async getServerHealth(): Promise<any> {
    return ServerHealthService.getServerHealth();
  }
}