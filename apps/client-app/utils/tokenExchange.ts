import { KEYCLOAK_CONFIG } from "../contexts/authConfig";

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
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: any
  ) {
    super(message);
    this.name = "TokenExchangeError";
  }
}

export async function exchangeToken(
  options: TokenExchangeOptions
): Promise<string> {
  const {
    currentToken,
    audience,
    clientId = "token-exchange-service",
  } = options;

  if (!currentToken) {
    throw new TokenExchangeError("Current token is required for exchange");
  }

  try {
    console.log("🔄 Starting token exchange...", { audience, clientId });

    const tokenEndpoint = `${KEYCLOAK_CONFIG.baseUrl}/realms/${KEYCLOAK_CONFIG.realm}/protocol/openid-connect/token`;

    const formData = new URLSearchParams();
    formData.append(
      "grant_type",
      "urn:ietf:params:oauth:grant-type:token-exchange"
    );
    formData.append("client_id", clientId);

    // For confidential clients, we need client credentials
    if (clientId === "token-exchange-service") {
      const clientSecret = (KEYCLOAK_CONFIG as any).tokenExchangeClientSecret;
      if (clientSecret && clientSecret !== "YOUR_TOKEN_EXCHANGE_SERVICE_CLIENT_SECRET") {
        formData.append("client_secret", clientSecret);
      } else {
        throw new TokenExchangeError(
          "Token exchange client secret not configured. Please set tokenExchangeClientSecret in authConfig.ts"
        );
      }
    }

    formData.append("subject_token", currentToken);
    formData.append(
      "subject_token_type",
      "urn:ietf:params:oauth:token-type:access_token"
    );
    formData.append("audience", audience);

    // For debugging - log the token exchange request
    console.log("Token exchange request params:", {
      grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
      client_id: clientId,
      audience: audience,
      subject_token_type: "urn:ietf:params:oauth:token-type:access_token",
      requested_token_type: "urn:ietf:params:oauth:token-type:access_token"
    });

    // Debug token format
    console.log("Subject token length:", currentToken.length);
    console.log("Subject token starts with:", currentToken.substring(0, 50) + "...");
    console.log("Token endpoint:", tokenEndpoint);
    formData.append(
      "requested_token_type",
      "urn:ietf:params:oauth:token-type:access_token"
    );

    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: formData.toString(),
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error("Token exchange failed:", {
        status: response.status,
        statusText: response.statusText,
        body: responseText,
      });

      const errorMessage = parseTokenExchangeError(
        responseText,
        response.status
      );
      throw new TokenExchangeError(errorMessage, response.status);
    }

    const result: TokenExchangeResult = JSON.parse(responseText);

    if (!result.access_token) {
      throw new TokenExchangeError(
        "No access token received from token exchange"
      );
    }

    console.log("✅ Token exchange successful!");
    return result.access_token;
  } catch (error) {
    if (error instanceof TokenExchangeError) {
      throw error;
    }

    console.error("Token exchange error:", error);
    throw new TokenExchangeError(
      error instanceof Error ? error.message : "Unknown token exchange error"
    );
  }
}

export async function exchangeTokenWithoutAudience(
  currentToken: string,
  clientId: string = "token-exchange-service"
): Promise<string> {
  if (!currentToken) {
    throw new TokenExchangeError("Current token is required for exchange");
  }

  try {
    console.log("🔄 Starting token exchange WITHOUT audience parameter...", { clientId });

    const tokenEndpoint = `${KEYCLOAK_CONFIG.baseUrl}/realms/${KEYCLOAK_CONFIG.realm}/protocol/openid-connect/token`;

    const formData = new URLSearchParams();
    formData.append(
      "grant_type",
      "urn:ietf:params:oauth:grant-type:token-exchange"
    );
    formData.append("client_id", clientId);

    // For confidential clients, we need client credentials
    if (clientId === "token-exchange-service") {
      const clientSecret = (KEYCLOAK_CONFIG as any).tokenExchangeClientSecret;
      if (clientSecret && clientSecret !== "YOUR_TOKEN_EXCHANGE_SERVICE_CLIENT_SECRET") {
        formData.append("client_secret", clientSecret);
      } else {
        throw new TokenExchangeError(
          "Token exchange client secret not configured. Please set tokenExchangeClientSecret in authConfig.ts"
        );
      }
    }

    formData.append("subject_token", currentToken);
    formData.append(
      "subject_token_type",
      "urn:ietf:params:oauth:token-type:access_token"
    );
    // NO AUDIENCE PARAMETER - let Keycloak decide
    formData.append(
      "requested_token_type",
      "urn:ietf:params:oauth:token-type:access_token"
    );

    console.log("Token exchange request (no audience):", {
      grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
      client_id: clientId,
      subject_token_type: "urn:ietf:params:oauth:token-type:access_token",
      requested_token_type: "urn:ietf:params:oauth:token-type:access_token"
    });

    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: formData.toString(),
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error("Token exchange (no audience) failed:", {
        status: response.status,
        statusText: response.statusText,
        body: responseText,
      });

      const errorMessage = parseTokenExchangeError(
        responseText,
        response.status
      );
      throw new TokenExchangeError(errorMessage, response.status);
    }

    const result: TokenExchangeResult = JSON.parse(responseText);

    if (!result.access_token) {
      throw new TokenExchangeError(
        "No access token received from token exchange"
      );
    }

    console.log("✅ Token exchange (no audience) successful!");
    return result.access_token;
  } catch (error) {
    if (error instanceof TokenExchangeError) {
      throw error;
    }

    console.error("Token exchange (no audience) error:", error);
    throw new TokenExchangeError(
      error instanceof Error ? error.message : "Unknown token exchange error"
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
    if (
      KEYCLOAK_CONFIG.authServerUrl &&
      !(error instanceof Error && error.message.includes("server-side"))
    ) {
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

async function serverSideTokenExchange(
  currentToken: string,
  audience: string
): Promise<string> {
  const serverResponse = await fetch(
    `${KEYCLOAK_CONFIG.authServerUrl}/auth/exchange-token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentToken}`,
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

function parseTokenExchangeError(
  responseText: string,
  statusCode: number
): string {
  try {
    const errorData = JSON.parse(responseText);

    switch (errorData.error) {
      case "invalid_client":
        return "Token exchange not allowed for this client. Please check Keycloak client permissions.";
      case "invalid_audience":
        return "Invalid audience. Ensure the target client exists and allows token exchange.";
      case "access_denied":
        if (errorData.error_description?.includes("token audience")) {
          return "Token audience issue. Check that 'client-app' token includes 'device-dashboard' in audience via audience mapper.";
        }
        return `Access denied: ${errorData.error_description || "Token exchange not permitted"}`;
      case "invalid_request":
        if (errorData.error_description?.includes("Invalid token")) {
          return "Invalid token format. The token may be expired, corrupted, or not properly formatted for token exchange.";
        }
        return `Invalid request: ${errorData.error_description || "Token exchange request malformed"}`;
      case "unsupported_grant_type":
        return "Token exchange not supported. Please enable token exchange in Keycloak.";
      default:
        return `Token exchange failed: ${errorData.error_description || errorData.error}`;
    }
  } catch {
    return `Token exchange failed with status ${statusCode}: ${responseText}`;
  }
}
