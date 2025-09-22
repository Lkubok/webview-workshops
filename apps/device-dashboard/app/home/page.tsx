"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  useEffect(() => {}, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Home Page</h1>

      <div style={{ marginBottom: "20px" }}>
        <p>Welcome to the WebView Navigation Demo!</p>
        <p>This is the home page of a multi-page Next.js application.</p>
      </div>

      <div
        style={{
          backgroundColor: "#f0f0f0",
          padding: "15px",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        <h3>Shared State</h3>
        <p>Theme: {/* TODO: Display current theme */}light</p>
        <p>Language: {/* TODO: Display current language */}en</p>
        <p>User ID: {/* TODO: Display user ID from shared state */}N/A</p>
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
            onClick={() => {
              console.log("Toggle theme");
            }}
          >
            Toggle Theme
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
            onClick={() => {
              console.log("Change language");
            }}
          >
            Change Language
          </button>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#e9ecef",
          padding: "15px",
          borderRadius: "5px",
        }}
      >
        <h3>Navigation Info</h3>
        <p>
          Current URL:{" "}
          {typeof window !== "undefined" ? window.location.pathname : "/home"}
        </p>
        <p>Can Go Back: {false}</p>
        <p>Page Title: Home</p>
      </div>
    </div>
  );
}
