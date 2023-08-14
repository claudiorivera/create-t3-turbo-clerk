import React from "react";
import { Text, View } from "react-native";
import { Redirect, useRootNavigationState } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useOAuth, useUser } from "@clerk/clerk-expo";

import { StyledButton } from "~/components/StyledButton";
import { useWarmUpBrowser } from "~/hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

export default function Home() {
	const { isLoaded, isSignedIn } = useUser();
	const navigationState = useRootNavigationState();

	if (isLoaded && isSignedIn) {
		// https://github.com/expo/router/issues/740
		if (!navigationState?.key) return;

		return <Redirect href="/posts" />;
	}

	return (
		<View className="flex h-full flex-col items-center justify-center">
			<SignIn />
		</View>
	);
}

const SignIn = () => {
	useWarmUpBrowser();

	const { startOAuthFlow } = useOAuth({ strategy: "oauth_github" });

	const onPress = React.useCallback(async () => {
		try {
			const { createdSessionId, setActive } = await startOAuthFlow();

			if (createdSessionId) {
				await setActive?.({ session: createdSessionId });
			} else {
				// Use signIn or signUp for next steps such as MFA
			}
		} catch (err) {
			console.error("OAuth error", err);
		}
	}, [startOAuthFlow]);

	return (
		<StyledButton onPress={onPress}>
			<Text>Sign In</Text>
		</StyledButton>
	);
};
