import { useCallback } from 'react';
import { Alert } from 'react-native';

export function useConnectionTest() {
  const testConnection = useCallback(async () => {
    try {
      const response = await fetch("http://192.168.233.174:4000/health");
      const data = await response.json();

      Alert.alert(
        "Connection Test",
        `Success: ${JSON.stringify(data)}`,
        [{ text: "OK" }]
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);

      Alert.alert(
        "Connection Test",
        `Failed: ${errorMessage}`,
        [{ text: "OK" }]
      );
    }
  }, []);

  return {
    testConnection,
  };
}