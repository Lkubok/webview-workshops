import { Platform } from 'react-native';
import { KEYCLOAK_CONFIG } from '../contexts/authConfig';
import { TokenService } from './tokenService';
import { AuthService } from './authService';

export interface AuthResult {
  type: 'success' | 'error' | 'cancel';
  code?: string;
  error?: string;
  errorDescription?: string;
}

export interface MobileAuthConfig {
  clientId: string;
  scopes: string[];
  redirectUri: string;
  responseType: string;
}

export class PlatformAuthService {
  /**
   * Perform platform-specific login flow
   */
  static async performLogin(): Promise<void> {
    // Check server connectivity for non-web platforms
    if (Platform.OS !== 'web') {
      const isConnected = await AuthService.checkServerConnectivity();
      if (!isConnected) {
        throw new Error(
          `Cannot reach auth server at ${KEYCLOAK_CONFIG.authServerUrl}. Please check:\n` +
          '1. Server is running\n' +
          '2. Device can access the server\n' +
          '3. No firewall blocking the connection'
        );
      }
    }

    if (Platform.OS === 'web') {
      await this.performWebLogin();
    } else {
      await this.performMobileLogin();
    }
  }

  /**
   * Perform web-based login using redirect flow
   */
  private static async performWebLogin(): Promise<void> {
    try {
      const state = this.generateRandomState();
      const authUrl = this.buildWebAuthUrl(state);

      // Store state for validation
      await TokenService.storeAuthState(state);

      console.log('Redirecting to Keycloak for web login...');
      window.location.href = authUrl;

    } catch (error) {
      console.error('Web login failed:', error);
      throw error;
    }
  }

  /**
   * Perform mobile login using expo-auth-session
   */
  private static async performMobileLogin(): Promise<void> {
    try {
      const { AuthRequest, makeRedirectUri } = await import('expo-auth-session');
      type AuthRequestConfig = import('expo-auth-session').AuthRequestConfig;

      const redirectUri = makeRedirectUri({
        native: 'com.anonymous.clientapp://auth-callback',
        scheme: 'com.anonymous.clientapp',
      });

      console.log('Mobile auth configuration:', {
        redirectUri,
        configuredRedirectUri: KEYCLOAK_CONFIG.redirectUri,
      });

      const config: AuthRequestConfig = {
        clientId: KEYCLOAK_CONFIG.clientId,
        scopes: ['openid', 'profile', 'email'],
        redirectUri,
        responseType: 'code',
        extraParams: {},
      };

      const request = new AuthRequest(config);
      const authUrl = `${KEYCLOAK_CONFIG.baseUrl}/realms/${KEYCLOAK_CONFIG.realm}/protocol/openid-connect/auth`;

      console.log('Starting mobile auth flow:', {
        authUrl,
        clientId: config.clientId,
        scopes: config.scopes,
      });

      const result = await request.promptAsync({
        authorizationEndpoint: authUrl,
      });

      await this.handleMobileAuthResult(result, redirectUri, request);

    } catch (error) {
      console.error('Mobile login failed:', error);
      throw error;
    }
  }

  /**
   * Handle the result of mobile authentication
   */
  private static async handleMobileAuthResult(
    result: any,
    redirectUri: string,
    request: any
  ): Promise<void> {
    console.log('Mobile auth result:', { type: result.type });

    switch (result.type) {
      case 'success':
        if (result.params.code) {
          console.log('Authentication successful, exchanging code for tokens...');
          const tokens = await AuthService.exchangeCodeForTokens({
            code: result.params.code,
            redirectUri,
            codeVerifier: request.codeVerifier,
          });
          await TokenService.storeTokens(tokens);
        } else {
          throw new Error('No authorization code received');
        }
        break;

      case 'error':
        console.error('Auth error details:', result.params);
        throw new Error(
          result.params?.error_description ||
          result.params?.error ||
          'Authentication failed'
        );

      case 'cancel':
        console.log('Authentication was cancelled by user or redirect failed');
        throw new Error(
          'Authentication was cancelled. This might be due to redirect URI configuration. ' +
          'Please check that \'com.anonymous.clientapp://auth-callback\' is added to your ' +
          'Keycloak client\'s Valid Redirect URIs.'
        );

      default:
        console.error('Unexpected auth result:', result);
        throw new Error(`Unexpected auth result type: ${result.type}`);
    }
  }

  /**
   * Build authentication URL for web login
   */
  private static buildWebAuthUrl(state: string): string {
    const baseUrl = `${KEYCLOAK_CONFIG.baseUrl}/realms/${KEYCLOAK_CONFIG.realm}/protocol/openid-connect/auth`;
    const redirectUri = encodeURIComponent(window.location.origin + '/auth-callback');

    const params = new URLSearchParams({
      client_id: KEYCLOAK_CONFIG.clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'openid profile email',
      state: state,
    });

    return `${baseUrl}?${params.toString()}`;
  }

  /**
   * Generate a random state for CSRF protection
   */
  private static generateRandomState(): string {
    return Math.random().toString(36).substring(7);
  }

  /**
   * Handle web authentication callback
   */
  static async handleWebAuthCallback(
    code: string,
    state: string,
    receivedState?: string
  ): Promise<void> {
    try {
      // Validate state for CSRF protection
      const storedState = await TokenService.getAndClearAuthState();
      if (receivedState && storedState && receivedState !== storedState) {
        throw new Error('Invalid state parameter - possible CSRF attack');
      }

      const redirectUri = window.location.origin + '/auth-callback';

      console.log('Processing web auth callback...');
      const tokens = await AuthService.exchangeCodeForTokens({
        code,
        redirectUri,
      });

      await TokenService.storeTokens(tokens);
      console.log('Web authentication completed successfully');

    } catch (error) {
      console.error('Web auth callback failed:', error);
      throw error;
    }
  }

  /**
   * Get platform-specific configuration for debugging
   */
  static getPlatformConfig() {
    return {
      platform: Platform.OS,
      isDev: __DEV__,
      baseUrl: KEYCLOAK_CONFIG.baseUrl,
      authServerUrl: KEYCLOAK_CONFIG.authServerUrl,
      realm: KEYCLOAK_CONFIG.realm,
      clientId: KEYCLOAK_CONFIG.clientId,
      redirectUri: KEYCLOAK_CONFIG.redirectUri,
    };
  }
}