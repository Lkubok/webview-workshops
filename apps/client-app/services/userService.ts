import { KEYCLOAK_CONFIG } from '../contexts/authConfig';
import { User } from '../types/auth';

export interface UserServiceError extends Error {
  statusCode?: number;
}

export class UserService {
  /**
   * Fetch user information from Keycloak using an access token
   */
  static async getUserInfo(accessToken: string): Promise<User | null> {
    if (!accessToken) {
      throw new Error('Access token is required to fetch user info');
    }

    try {
      const userInfoEndpoint = `${KEYCLOAK_CONFIG.baseUrl}/realms/${KEYCLOAK_CONFIG.realm}/protocol/openid-connect/userinfo`;

      console.log('Fetching user info from:', userInfoEndpoint);

      const response = await fetch(userInfoEndpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to fetch user info:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });

        if (response.status === 401) {
          // Token is invalid or expired
          return null;
        }

        const error = new Error(`Failed to fetch user info: ${response.statusText}`) as UserServiceError;
        error.statusCode = response.status;
        throw error;
      }

      const userInfo: User = await response.json();

      console.log('User info fetched successfully:', {
        sub: userInfo.sub,
        username: userInfo.preferred_username,
        email: userInfo.email,
      });

      return userInfo;

    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching user info:', error.message);
      } else {
        console.error('Unknown error fetching user info:', error);
      }

      // Return null for network errors or invalid responses
      // This allows the calling code to handle gracefully
      return null;
    }
  }

  /**
   * Validate user data structure
   */
  static validateUser(user: any): user is User {
    return (
      typeof user === 'object' &&
      user !== null &&
      typeof user.sub === 'string' &&
      (user.preferred_username === undefined || typeof user.preferred_username === 'string') &&
      (user.email === undefined || typeof user.email === 'string') &&
      (user.name === undefined || typeof user.name === 'string')
    );
  }

  /**
   * Get display name for the user
   */
  static getDisplayName(user: User | null): string {
    if (!user) {
      return 'User';
    }

    return user.preferred_username || user.name || user.email || 'User';
  }

  /**
   * Check if user has required profile information
   */
  static hasCompleteProfile(user: User | null): boolean {
    if (!user) {
      return false;
    }

    return !!(user.sub && (user.preferred_username || user.name || user.email));
  }

  /**
   * Extract user initials for display purposes
   */
  static getUserInitials(user: User | null): string {
    if (!user) {
      return 'U';
    }

    const name = user.name || user.preferred_username || user.email;
    if (!name) {
      return 'U';
    }

    const words = name.split(' ').filter(word => word.length > 0);
    if (words.length === 0) {
      return 'U';
    }

    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }

    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  }
}