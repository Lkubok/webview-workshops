"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useHasRole } from "@/hooks/useRole";

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

export default function EmbeddedPage() {
  const { data: session, status } = useSession();
  const accessToken = (session as typeof session & { accessToken?: string })
    ?.accessToken;
  const router = useRouter();
  const hasDashboardRole = useHasRole(
    accessToken,
    "device-dashboard",
    "dashboard-app-user"
  );

  const [receivedToken, setReceivedToken] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

  useEffect(() => {
    // Extract token from hash params
    const extractTokenFromHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const params = new URLSearchParams(hash.substring(1)); // Remove # and parse
        const token = params.get('token');
        if (token) {
          setReceivedToken(decodeURIComponent(token));
          // Optionally clean up the hash from URL
          window.history.replaceState(null, '', window.location.pathname);
        }
      }
    };

    // Extract token on initial load
    extractTokenFromHash();

    // Listen for hash changes (in case token is updated)
    const handleHashChange = () => {
      extractTokenFromHash();
    };

    window.addEventListener('hashchange', handleHashChange);

    // Also listen for navigation messages from React Native
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "navigate" && data.url) {
          // Extract token from the new URL
          const url = new URL(data.url);
          const hash = url.hash;
          if (hash) {
            const params = new URLSearchParams(hash.substring(1));
            const token = params.get('token');
            if (token) {
              setReceivedToken(decodeURIComponent(token));
            }
          }
        }
      } catch (error) {
        console.log("Error parsing message:", error);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const requestTokenRefresh = () => {
    const message = JSON.stringify({
      type: "refresh_token_request"
    });

    // Send message to React Native requesting token refresh
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(message);
    } else {
      console.log("ReactNativeWebView not available");
      alert("This feature only works when running in React Native WebView");
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const goBack = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="text-xs">
              WebView Ready
            </Badge>
            <Button onClick={goBack} variant="ghost" size="sm">
              ← Back
            </Button>
          </div>
          <h1 className="text-2xl font-bold">Exercise 2: Token Exchange</h1>
          <p className="text-muted-foreground text-sm">
            Token passed from React Native via hash params
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Token Display</CardTitle>
            <CardDescription>
              Token received from React Native WebView via hash parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Token Display */}
            <div className="p-6 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Received Token:</h3>
              {receivedToken ? (
                <div className="bg-white p-3 rounded border font-mono text-sm break-all">
                  {receivedToken}
                </div>
              ) : (
                <div className="text-muted-foreground italic">
                  No token received yet. Use "Send Initial Token" button in the React Native app.
                </div>
              )}
            </div>

            {/* Token Refresh Button */}
            <div className="flex justify-center">
              <Button
                onClick={requestTokenRefresh}
                variant="default"
                disabled={!receivedToken}
              >
                Refresh Token
              </Button>
            </div>

            {/* Instructions */}
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-sm mb-2 text-green-900">✅ Implementation Complete:</h3>
              <ol className="text-sm space-y-1 list-decimal list-inside text-green-800">
                <li>Token extraction from hash params implemented</li>
                <li>Token display working</li>
                <li>Refresh token communication implemented</li>
                <li>Hash cleanup after token extraction</li>
              </ol>
            </div>

            {/* User Info */}
            <div className="p-3 bg-muted rounded-lg">
              <h3 className="font-semibold text-sm mb-2">Authenticated User</h3>
              <div className="text-sm space-y-1">
                <p>
                  <strong>Name:</strong> {session.user?.name || "Not provided"}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  {session.user?.email || "Not provided"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Exercise 2: Token exchange implemented between React Native and Next.js
          </p>
        </div>
      </div>
    </div>
  );
}