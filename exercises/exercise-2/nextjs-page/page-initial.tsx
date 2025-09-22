"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

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
              Exercise 2 - Initial
            </Badge>
            <Button onClick={goBack} variant="ghost" size="sm">
              ← Back
            </Button>
          </div>
          <h1 className="text-2xl font-bold">Cookie Handling Exercise</h1>
          <p className="text-muted-foreground text-sm">
            Learn to handle cookies between React Native and WebView
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cookie Information</CardTitle>
            <CardDescription>
              This page will display cookie information from the WebView
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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

            {/* TODO: Add cookie display section */}
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-sm mb-2 text-yellow-900">
                🍪 Cookie Integration Coming Soon
              </h3>
              <p className="text-sm text-yellow-800">
                Complete the React Native side to enable cookie handling and display here.
              </p>
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
            Exercise 2: Add cookie handling functionality
          </p>
        </div>
      </div>
    </div>
  );
}