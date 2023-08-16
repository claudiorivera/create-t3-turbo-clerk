import React from "react";
import { Text } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";

import { StyledButton } from "~/components/StyledButton";
import { useWarmUpBrowser } from "~/hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

export const SignInButton = () => {
	useWarmUpBrowser();

	const { startOAuthFlow } = useOAuth({ strategy: "oauth_github" });

	const onPress = React.useCallback(async () => {
		try {
			const { createdSessionId, setActive } = await startOAuthFlow();

			if (createdSessionId && !!setActive) {
				await setActive({ session: createdSessionId });
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
