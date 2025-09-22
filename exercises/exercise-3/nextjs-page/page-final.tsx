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

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

  useEffect(() => {
    const handleWindowMessage = (event: MessageEvent) => {
      try {
        // Handle messages sent from React Native WebView's postMessage
        let messageData;

        // React Native WebView sends messages in event.data directly
        if (typeof event.data === "string") {
          messageData = JSON.parse(event.data);
        } else {
          messageData = event.data;
        }

        console.log("Received message from React Native:", messageData);

        if (messageData.type === "increment_counter") {
          setCounter((prevCounter) => {
            const newCounter = prevCounter + 1;
            sendCounterUpdate(newCounter);
            return newCounter;
          });
        }
      } catch (error) {
        console.log("Error parsing message:", error);
        console.log("Raw event data:", event.data);
      }
    };

    const handleDocumentMessage = (event: Event) => {
      // Handle React Native WebView messages that come through document
      const messageEvent = event as MessageEvent;
      handleWindowMessage(messageEvent);
    };

    // Listen for messages from React Native WebView
    window.addEventListener("message", handleWindowMessage);

    // Also listen for the 'message' event on document for React Native WebView compatibility
    document.addEventListener("message", handleDocumentMessage);

    return () => {
      window.removeEventListener("message", handleWindowMessage);
      document.removeEventListener("message", handleDocumentMessage);
    };
  }, []);

  const sendCounterUpdate = (newCounter: number) => {
    const message = JSON.stringify({
      type: "counter_updated",
      counter: newCounter,
    });

    // Send message back to React Native WebView
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(message);
    } else {
      console.log("ReactNativeWebView not available");
    }
  };

  const incrementCounter = () => {
    const newCounter = counter + 1;
    setCounter(newCounter);
    sendCounterUpdate(newCounter);

    // Show alert when using local Next.js button
    alert(`Counter incremented locally to: ${newCounter}`);
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
          <h1 className="text-2xl font-bold">
            Exercise 1: Two-Way Communication
          </h1>
          <p className="text-muted-foreground text-sm">
            Counter controlled from React Native WebView
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Counter Component</CardTitle>
            <CardDescription>
              This counter can be incremented from the React Native app
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Counter Display */}
            <div className="text-center p-6 bg-muted rounded-lg">
              <h2 className="text-3xl font-bold mb-2">Counter: {counter}</h2>
              <p className="text-sm text-muted-foreground">
                Use the button in the React Native app to increment this counter
              </p>
            </div>

            {/* Local increment button for testing */}
            <div className="flex justify-center">
              <Button onClick={incrementCounter} variant="outline">
                Local Increment (for testing)
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
                  <strong>Email:</strong>{" "}
                  {session.user?.email || "Not provided"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Exercise 1: Two-way communication implemented between React Native
            and Next.js
          </p>
        </div>
      </div>
    </div>
  );
}
