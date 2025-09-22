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

  const [cookies, setCookies] = useState<string>("");

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

  useEffect(() => {
    // Send current cookies to React Native on page load
    const currentCookies = document.cookie;
    if (currentCookies && window.ReactNativeWebView) {
      const message = JSON.stringify({
        type: "cookies",
        cookies: currentCookies
      });
      window.ReactNativeWebView.postMessage(message);
    }
    setCookies(currentCookies);
  }, []);

  const syncCookies = () => {
    const currentCookies = document.cookie;
    setCookies(currentCookies);

    if (window.ReactNativeWebView) {
      const message = JSON.stringify({
        type: "sync_cookies",
        cookies: currentCookies || "No cookies found"
      });
      window.ReactNativeWebView.postMessage(message);
    } else {
      alert(`Current cookies: ${currentCookies || "No cookies found"}`);
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
              Exercise 2 - Complete
            </Badge>
            <Button onClick={goBack} variant="ghost" size="sm">
              ← Back
            </Button>
          </div>
          <h1 className="text-2xl font-bold">Cookie Handling Exercise</h1>
          <p className="text-muted-foreground text-sm">
            Cookie communication between React Native and WebView
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cookie Information</CardTitle>
            <CardDescription>
              This page displays and syncs cookies with the React Native app
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Cookie Display */}
            <div className="p-3 bg-muted rounded-lg">
              <h3 className="font-semibold text-sm mb-2">🍪 Current Cookies</h3>
              <div className="bg-white p-2 rounded border text-xs font-mono break-all">
                {cookies || "No cookies found"}
              </div>
            </div>

            {/* Sync Button */}
            <div className="flex justify-center">
              <Button onClick={syncCookies} variant="default">
                Sync Cookies with Native App
              </Button>
            </div>

            {/* User Info */}
            <div className="p-3 bg-muted rounded-lg">
              <h3 className="font-semibold text-sm mb-2">Authenticated User</h3>
              <div className="text-sm space-y-1">
                <p>
                  <strong>Name:</strong> {session.user?.name || "Not provided"}
                </p>
                <p>
                  <strong>Email:</strong> {session.user?.email || "Not provided"}
                </p>
              </div>
            </div>

            {/* Dashboard Role */}
            {hasDashboardRole && (
              <div className="p-3 bg-muted rounded-lg">
                <h3 className="font-semibold text-sm mb-2">Dashboard Access</h3>
                <p className="text-sm">
                  ✅ You have dashboard-app-user role
                </p>
              </div>
            )}

            {/* Cookie Features */}
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-sm mb-2 text-green-900">
                ✅ Cookie Features Implemented
              </h3>
              <ul className="text-sm text-green-800 list-disc list-inside space-y-1">
                <li>Automatic cookie detection on page load</li>
                <li>Manual cookie sync with React Native</li>
                <li>Cookie display in WebView</li>
                <li>Cookie menu integration in navigation</li>
              </ul>
            </div>

            <div className="flex justify-center">
              <Button onClick={() => window.location.reload()} variant="outline">
                Refresh Page
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Exercise 2: Cookie handling implementation completed
          </p>
        </div>
      </div>
    </div>
  );
}