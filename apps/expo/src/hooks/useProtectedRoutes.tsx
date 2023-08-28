import { useEffect } from "react";
import { router, useRootNavigationState, useSegments } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export function useProtectedRoutes() {
	const { isSignedIn, isLoaded } = useAuth();
	const segments = useSegments();
	const rootNavigationState = useRootNavigationState();

	useEffect(() => {
		if (!(isLoaded && rootNavigationState?.key)) return;

		const inTabsGroup = segments[0] === "(protected)";

		if (isSignedIn && !inTabsGroup) {
			router.replace("/profile");
		} else if (!isSignedIn) {
			router.replace("/sign-in");
		}
	}, [isSignedIn, segments, isLoaded, rootNavigationState?.key]);
}
