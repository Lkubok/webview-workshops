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

export default function EmbeddedPage() {
  const { data: session, status } = useSession();
  console.log("NEXTJS access token");
  const accessToken = (session as typeof session & { accessToken?: string })
    ?.accessToken;
  console.log(accessToken);
  const router = useRouter();
  const hasDashboardRole = useHasRole(
    accessToken,
    "device-dashboard",
    "dashboard-app-user"
  );

  console.log("Has dashboard role:", hasDashboardRole);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <p className="text-muted-foreground mt-2">Loading...</p>
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
    <div className="bg-background min-h-screen p-4">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              WebView Ready
            </Badge>
            <Button onClick={goBack} variant="ghost" size="sm">
              ← Back
            </Button>
          </div>
          <h1 className="text-2xl font-bold">Embedded Workshop View</h1>
          <p className="text-muted-foreground text-sm">
            Optimized for React Native WebView display
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Workshop Content</CardTitle>
            <CardDescription>
              This page is designed to be embedded in a React Native WebView
              component
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted rounded-lg p-3">
              <h3 className="mb-2 text-sm font-semibold">Authenticated User</h3>
              <div className="space-y-1 text-sm">
                <p>
                  <strong>Name:</strong> {session.user?.name || "Not provided"}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  {session.user?.email || "Not provided"}
                </p>
              </div>
            </div>

            <div className="bg-muted rounded-lg p-3">
              <h3 className="mb-2 text-sm font-semibold">WebView Features</h3>
              <ul className="list-inside list-disc space-y-1 text-sm">
                <li>Responsive design for mobile screens</li>
                <li>Touch-friendly interface elements</li>
                <li>Minimal navigation for embedded context</li>
                <li>Authentication state preserved</li>
              </ul>
            </div>

            {hasDashboardRole && (
              <div className="bg-muted rounded-lg p-3">
                <h3 className="mb-2 text-sm font-semibold">
                  Dashboard user info
                </h3>
                <ul className="list-inside list-disc space-y-1 text-sm">
                  <li>
                    {hasDashboardRole
                      ? "You have the dashboard-app-user role."
                      : "You do NOT have the dashboard-app-user role."}
                  </li>
                  <li>
                    This role allows access to specific dashboard features.
                  </li>
                </ul>
              </div>
            )}

            <div className="flex flex-col gap-2 pt-2 sm:flex-row">
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                Refresh Content
              </Button>
              <Button onClick={goBack} size="sm" className="flex-1">
                Return to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-xs">
            This page is protected by Keycloak authentication and ready for
            WebView embedding
          </p>
        </div>
      </div>
    </div>
  );
}
