import { Slot } from "expo-router";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import LoginPage from "./login";

function AppContent() {
  const { token } = useAuth();

  // If no token, show login
  if (!token) return <LoginPage />;

  // Otherwise show the normal app (tabs)
  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
