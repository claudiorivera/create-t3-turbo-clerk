import React from "react";
import { Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";

import AuthExample from "~/components/AuthExample";
import SignIn from "~/components/SignIn";

const SignOut = () => {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <View>
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};

const Index = () => {
  return (
    <SafeAreaView className="bg-[#1F104A]">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full p-4">
        <SignedIn>
          <AuthExample />
          <SignOut />
        </SignedIn>
        <SignedOut>
          <SignIn />
        </SignedOut>
      </View>
    </SafeAreaView>
  );
};

export default Index;
