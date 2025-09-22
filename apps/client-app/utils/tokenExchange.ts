import { KEYCLOAK_CONFIG } from '../contexts/authConfig';

export interface TokenExchangeOptions {
  currentToken: string;
  audience: string;
  clientId?: string;
}

export interface TokenExchangeResult {
  access_token: string;
  token_type?: string;
  expires_in?: number;
}

export class TokenExchangeError extends Error {
  constructor(message: string, public statusCode?: number, public originalError?: any) {
    super(message);
    this.name = 'TokenExchangeError';
  }
}

export async function exchangeToken(options: TokenExchangeOptions): Promise<string> {
  const { currentToken, audience, clientId = KEYCLOAK_CONFIG.clientId } = options;

  if (!currentToken) {
    throw new TokenExchangeError("Current token is required for exchange");
  }

  try {
    console.log("🔄 Starting token exchange...", { audience, clientId });

    const tokenEndpoint = `${KEYCLOAK_CONFIG.baseUrl}/realms/${KEYCLOAK_CONFIG.realm}/protocol/openid-connect/token`;

    const formData = new URLSearchParams();
    formData.append('grant_type', 'urn:ietf:params:oauth:grant-type:token-exchange');
    formData.append('client_id', clientId);
    formData.append('subject_token', currentToken);
    formData.append('subject_token_type', 'urn:ietf:params:oauth:token-type:access_token');
    formData.append('audience', audience);
    formData.append('requested_token_type', 'urn:ietf:params:oauth:token-type:access_token');

    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: formData.toString(),
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error("Token exchange failed:", {
        status: response.status,
        statusText: response.statusText,
        body: responseText
      });

      const errorMessage = parseTokenExchangeError(responseText, response.status);
      throw new TokenExchangeError(errorMessage, response.status);
    }

    const result: TokenExchangeResult = JSON.parse(responseText);

    if (!result.access_token) {
      throw new TokenExchangeError('No access token received from token exchange');
    }

    console.log("✅ Token exchange successful!");
    return result.access_token;

  } catch (error) {
    if (error instanceof TokenExchangeError) {
      throw error;
    }

    console.error("Token exchange error:", error);
    throw new TokenExchangeError(
      error instanceof Error ? error.message : 'Unknown token exchange error'
    );
  }
}

export async function exchangeTokenWithFallback(
  currentToken: string,
  audience: string
): Promise<string> {
  try {
    return await exchangeToken({ currentToken, audience });
  } catch (error) {
    if (KEYCLOAK_CONFIG.authServerUrl && !(error instanceof Error && error.message.includes('server-side'))) {
      console.log("⚠️ Attempting server-side token exchange fallback...");
      try {
        return await serverSideTokenExchange(currentToken, audience);
      } catch (serverError) {
        console.error("Server-side exchange also failed:", serverError);
      }
    }
    throw error;
  }
}

async function serverSideTokenExchange(currentToken: string, audience: string): Promise<string> {
  const serverResponse = await fetch(
    `${KEYCLOAK_CONFIG.authServerUrl}/auth/exchange-token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentToken}`,
      },
      body: JSON.stringify({ audience }),
    }
  );

  if (!serverResponse.ok) {
    const serverError = await serverResponse.text();
    throw new TokenExchangeError(`Server-side exchange failed: ${serverError}`);
  }

  const serverResult = await serverResponse.json();
  console.log("✅ Server-side token exchange successful!");
  return serverResult.access_token;
}

function parseTokenExchangeError(responseText: string, statusCode: number): string {
  try {
    const errorData = JSON.parse(responseText);

    switch (errorData.error) {
      case 'invalid_client':
        return 'Token exchange not allowed for this client. Please check Keycloak client permissions.';
      case 'invalid_audience':
        return 'Invalid audience. Ensure the target client exists and allows token exchange.';
      case 'unsupported_grant_type':
        return 'Token exchange not supported. Please enable token exchange in Keycloak.';
      default:
        return `Token exchange failed: ${errorData.error_description || errorData.error}`;
    }
  } catch {
    return `Token exchange failed with status ${statusCode}: ${responseText}`;
  }
}