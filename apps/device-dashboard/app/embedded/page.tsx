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
import { ThemeToggle } from "@/components/theme-toggle";

export default function EmbeddedPage() {
  const { data: session, status } = useSession();
  // const {} = useAuth
  console.log("NEXTJS access token");
  console.log(session?.accessToken);
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading
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
    return null; // Will redirect to login
  }

  const goBack = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header optimized for mobile/WebView */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="text-xs">
              WebView Ready
            </Badge>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button onClick={goBack} variant="ghost" size="sm">
                ← Back
              </Button>
            </div>
          </div>
          <h1 className="text-2xl font-bold">Embedded Workshop View</h1>
          <p className="text-muted-foreground text-sm">
            Optimized for React Native WebView display
          </p>
        </div>

        {/* Main Content Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Workshop Content</CardTitle>
            <CardDescription>
              This page is designed to be embedded in a React Native WebView
              component
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
                  <strong>Email:</strong>{" "}
                  {session.user?.email || "Not provided"}
                </p>
              </div>
            </div>

            {/* WebView Features */}
            <div className="p-3 bg-muted rounded-lg">
              <h3 className="font-semibold text-sm mb-2">WebView Features</h3>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Responsive design for mobile screens</li>
                <li>Touch-friendly interface elements</li>
                <li>Minimal navigation for embedded context</li>
                <li>Authentication state preserved</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
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

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            This page is protected by Keycloak authentication and ready for
            WebView embedding
          </p>
        </div>
      </div>
    </div>
  );
}
