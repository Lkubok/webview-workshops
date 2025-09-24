"use client";

import { useSession, signOut } from "next-auth/react";
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
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading
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
    return null; // Will redirect to login
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="bg-background min-h-screen p-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Workshop Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {session.user?.name || session.user?.email}
            </p>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>

        {/* Welcome Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Welcome to the Workshop!</CardTitle>
            <CardDescription>
              You have successfully authenticated with Keycloak. This dashboard
              is protected and only visible to authenticated users.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-semibold">User Information:</h3>
                <div className="text-muted-foreground space-y-1 text-sm">
                  <p>
                    <strong>Name:</strong>{" "}
                    {session.user?.name || "Not provided"}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {session.user?.email || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="mb-3 font-semibold">Available Actions:</h3>
                <Link href="/embedded">
                  <Button className="w-full sm:w-auto">
                    View Embedded Page
                  </Button>
                </Link>
                <p className="text-muted-foreground mt-2 text-sm">
                  This page is designed to be displayed inside a React Native
                  WebView
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
