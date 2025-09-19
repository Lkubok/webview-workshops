import { Tabs } from "expo-router";
import ProfileScreen from "./profile";
import HomeScreen from "./home";
import EmbeddedScreen from "./embedded";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      <Tabs.Screen name="embedded" options={{ title: "Embedded View" }} />
    </Tabs>
  );
}
