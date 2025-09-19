import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import { useAuth } from "../../contexts/AuthContext";

export default function EmbeddedScreen() {
  const { token } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{
          uri: `http://<your-local-ip>:3000/embedded?access_token=${token}`,
        }}
      />
    </View>
  );
}
