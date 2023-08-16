import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Slot, useRouter, useSegments } from "expo-router";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";

import { TRPCProvider } from "~/utils/api";
import { tokenCache } from "~/utils/cache";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) throw new Error("Missing Clerk publishable key");

const Layout = () => {
	const { isLoaded, isSignedIn } = useAuth();
	const segments = useSegments();
	const router = useRouter();

	useEffect(() => {
		if (!isLoaded) return;

		const inTabsGroup = segments[0] === "(protected)";

		if (isSignedIn && !inTabsGroup) {
			router.replace("/posts");
		} else if (!isSignedIn) {
			router.replace("/sign-in");
		}
	}, [isSignedIn, isLoaded, segments, router]);

	return <Slot />;
};

const RootLayout = () => {
	return (
		<ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
			<TRPCProvider>
				<SafeAreaProvider>
					<Layout />
				</SafeAreaProvider>
			</TRPCProvider>
		</ClerkProvider>
	);
};

export default RootLayout;
