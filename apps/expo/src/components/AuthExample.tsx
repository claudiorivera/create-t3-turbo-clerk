import { Text } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

export default function AuthExample() {
  const { isLoaded, userId, sessionId, orgRole } = useAuth();

  // In case the user signs out while on the page.
  if (!isLoaded || !userId) {
    return null;
  }

  return (
    <Text className="text-white">
      {JSON.stringify({ userId, sessionId, orgRole }, null, 2)}
    </Text>
  );
}
