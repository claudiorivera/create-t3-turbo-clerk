import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";

import { TRPCProvider } from "~/utils/api";
import { tokenCache } from "~/utils/cache";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) throw new Error("Missing Clerk publishable key");

const RootLayout = () => {
	return (
		<ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
			<TRPCProvider>
				<SafeAreaProvider>
					<Stack>
						<Stack.Screen
							name="(tabs)"
							options={{
								headerShown: false,
							}}
						/>
					</Stack>
				</SafeAreaProvider>
			</TRPCProvider>
		</ClerkProvider>
	);
};

export default RootLayout;
