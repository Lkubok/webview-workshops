export interface TokenExchangeRequest {
  code: string;
  redirectUri: string;
  code_verifier?: string | undefined;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface LogoutRequest {
  refresh_token?: string | undefined;
  access_token?: string | undefined;
}

export interface UserInfoRequest {
  access_token: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export interface UserInfo {
  sub: string;
  email?: string;
  preferred_username?: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  [key: string]: unknown;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  keycloak_issuer: string | undefined;
  client_id: string | undefined;
}
