import { KEYCLOAK_CONFIG } from '../contexts/authConfig';

export class ServerHealthService {
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