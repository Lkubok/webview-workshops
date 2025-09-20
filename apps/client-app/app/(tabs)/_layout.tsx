import React from "react";
import { Tabs } from "expo-router";
import { TouchableOpacity, Alert, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthContext";

export default function TabLayout() {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    if (Platform.OS === "web") {
      // For web, use native browser confirm dialog
      if (window.confirm("Are you sure you want to sign out?")) {
        logout();
      }
    } else {
      // For mobile, use React Native Alert
      Alert.alert("Sign Out", "Are you sure you want to sign out?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: logout,
        },
      ]);
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} style={{ marginRight: 16 }}>
            <Ionicons name="log-out-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={24}
            />
          ),
          headerTitle: user?.preferred_username || user?.name || "Home",
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "compass" : "compass-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
