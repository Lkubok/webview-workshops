import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const StorageUtils = {
  async getItem(key: string): Promise<string | null> {
    try {
      if (Platform.OS === "web") return localStorage.getItem(key);
      return await SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    try {
      if (Platform.OS === "web") localStorage.setItem(key, value);
      else await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.warn(`Failed to store item ${key}:`, error);
    }
  },

  async deleteItem(key: string): Promise<void> {
    try {
      if (Platform.OS === "web") localStorage.removeItem(key);
      else await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.warn(`Failed to delete item ${key}:`, error);
    }
  },
};

export default StorageUtils;
