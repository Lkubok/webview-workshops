import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface NavigationBarProps {
  canGoBack: boolean;
  canGoForward: boolean;
  onGoBack: () => void;
  onGoForward: () => void;
  onRefresh: () => void;
  onCookieMenu: () => void;
}

export function NavigationBar({
  canGoBack,
  canGoForward,
  onGoBack,
  onGoForward,
  onRefresh,
  onCookieMenu,
}: NavigationBarProps) {
  return (
    <View style={styles.navigationBar}>
      <TouchableOpacity
        style={[styles.navButton, !canGoBack && styles.navButtonDisabled]}
        onPress={onGoBack}
        disabled={!canGoBack}
      >
        <Ionicons
          name="chevron-back"
          size={24}
          color={canGoBack ? "#007AFF" : "#ccc"}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navButton, !canGoForward && styles.navButtonDisabled]}
        onPress={onGoForward}
        disabled={!canGoForward}
      >
        <Ionicons
          name="chevron-forward"
          size={24}
          color={canGoForward ? "#007AFF" : "#ccc"}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton} onPress={onRefresh}>
        <Ionicons name="refresh" size={24} color="#007AFF" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.cookieButton} onPress={onCookieMenu}>
        <Ionicons name="settings-outline" size={24} color="#007AFF" />
        <Text style={styles.cookieButtonText}>Cookies</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navigationBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    ...Platform.select({
      ios: {
        paddingTop: 16,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  navButton: {
    padding: 8,
    marginRight: 12,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  cookieButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: "auto",
  },
  cookieButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },
});