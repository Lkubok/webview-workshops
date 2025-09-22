export interface User {
  sub: string;
  preferred_username?: string;
  email?: string;
  name?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  accessToken: string | null;
  refreshTokenValue: string | null;
  exchangeTokenForDeviceDashboard: (currentToken: string) => Promise<string>;
}

export interface TokenData {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  token_type?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  accessToken: string | null;
  refreshTokenValue: string | null;
}