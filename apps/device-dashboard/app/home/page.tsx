"use client";

import React, { useEffect, useState, createContext, useContext } from "react";
import Link from "next/link";

interface SharedState {
  theme: string;
  language: string;
  userPreferences: any;
  userProfile?: any;
}

const SharedStateContext = createContext<{
  sharedState: SharedState;
  setSharedState: React.Dispatch<React.SetStateAction<SharedState>>;
}>({
  sharedState: { theme: "light", language: "en", userPreferences: {} },
  setSharedState: () => {},
});

export const SharedStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sharedState, setSharedState] = useState<SharedState>({
    theme: "light",
    language: "en",
    userPreferences: {},
  });

  return (
    <SharedStateContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </SharedStateContext.Provider>
  );
};

export default function HomePage() {
  const { sharedState, setSharedState } = useContext(SharedStateContext);
  const [navigationState, setNavigationState] = useState({
    canGoBack: false,
    url: "/",
  });

  useEffect(() => {
    const sendNavigationUpdate = () => {
      if (typeof window !== "undefined" && window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: "navigation_changed",
            url: window.location.pathname,
            title: "Home",
            canGoBack: window.history.length > 1,
          })
        );
      }
    };

    const handleMessage = (event: MessageEvent) => {
      try {
        const message = JSON.parse(event.data);

        switch (message.type) {
          case "navigate_to_page":
            if (message.page === "profile") {
              window.location.href = "/profile";
            } else if (message.page === "settings") {
              window.location.href = "/settings";
            } else if (message.page === "home") {
              window.location.href = "/home";
            }
            break;

          case "update_shared_state":
            setSharedState((prev) => ({
              ...prev,
              ...message.state,
            }));
            break;
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };

    window.addEventListener("message", handleMessage);

    // Update navigation state
    setNavigationState({
      canGoBack: window.history.length > 1,
      url: window.location.pathname,
    });

    // Send initial navigation state
    setTimeout(sendNavigationUpdate, 100);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [setSharedState]);

  const updateSharedState = (updates: Partial<SharedState>) => {
    const newState = { ...sharedState, ...updates };
    setSharedState(newState);

    // Send state update to React Native
    if (typeof window !== "undefined" && window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: "state_updated",
          state: updates,
        })
      );
    }
  };

  const toggleTheme = () => {
    const newTheme = sharedState.theme === "light" ? "dark" : "light";
    updateSharedState({ theme: newTheme });
  };

  const changeLanguage = () => {
    const languages = ["en", "es", "fr", "de"];
    const currentIndex = languages.indexOf(sharedState.language);
    const nextLanguage = languages[(currentIndex + 1) % languages.length];
    updateSharedState({ language: nextLanguage });
  };

  const containerStyle = {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: sharedState.theme === "dark" ? "#2d3748" : "#ffffff",
    color: sharedState.theme === "dark" ? "#ffffff" : "#000000",
    minHeight: "100vh",
  };

  return (
    <div style={containerStyle}>
      <h1>Home Page</h1>

      <div style={{ marginBottom: "20px" }}>
        <p>Welcome to the WebView Navigation Demo!</p>
        <p>
          This is the home page of a multi-page Next.js application with state
          management.
        </p>
        <p>Current Language: {sharedState.language}</p>
      </div>

      <div
        style={{
          backgroundColor: sharedState.theme === "dark" ? "#4a5568" : "#f0f0f0",
          padding: "15px",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        <h3>Shared State</h3>
        <p>Theme: {sharedState.theme}</p>
        <p>Language: {sharedState.language}</p>
        <p>User Profile: {sharedState.userProfile ? "Loaded" : "Not set"}</p>
        <pre
          style={{
            fontSize: "12px",
            backgroundColor:
              sharedState.theme === "dark" ? "#2d3748" : "#ffffff",
            padding: "10px",
            borderRadius: "3px",
          }}
        >
          {JSON.stringify(sharedState, null, 2)}
        </pre>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Navigation</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Link
            href="/profile"
            style={{
              backgroundColor: "#007AFF",
              color: "white",
              padding: "10px 15px",
              borderRadius: "5px",
              textDecoration: "none",
            }}
          >
            Go to Profile
          </Link>

          <Link
            href="/settings"
            style={{
              backgroundColor: "#007AFF",
              color: "white",
              padding: "10px 15px",
              borderRadius: "5px",
              textDecoration: "none",
            }}
          >
            Go to Settings
          </Link>
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>State Controls</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            style={{
              backgroundColor: "#28a745",
              color: "white",
              padding: "8px 12px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={toggleTheme}
          >
            Toggle Theme ({sharedState.theme})
          </button>

          <button
            style={{
              backgroundColor: "#28a745",
              color: "white",
              padding: "8px 12px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={changeLanguage}
          >
            Change Language ({sharedState.language})
          </button>
        </div>
      </div>

      <div
        style={{
          backgroundColor: sharedState.theme === "dark" ? "#4a5568" : "#e9ecef",
          padding: "15px",
          borderRadius: "5px",
        }}
      >
        <h3>Navigation Info</h3>
        <p>
          Current URL:{" "}
          {typeof window !== "undefined" ? window.location.pathname : "/home"}
        </p>
        <p>Can Go Back: {navigationState.canGoBack ? "Yes" : "No"}</p>
        <p>Page Title: Home</p>
        <p>
          History Length:{" "}
          {typeof window !== "undefined" ? window.history.length : 0}
        </p>
      </div>
    </div>
  );
}
