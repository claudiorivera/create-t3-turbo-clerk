import type { ReactNode } from "react";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";

import { StyledButton } from "~/components/StyledButton";
import { useWarmUpBrowser } from "~/hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

export const SignInButton = ({
	provider,
	children,
}: {
	provider: "github" | "google";
	children: ReactNode;
}) => {
	useWarmUpBrowser();

	const { startOAuthFlow } = useOAuth({
		strategy: provider === "github" ? "oauth_github" : "oauth_google",
	});

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

	return <StyledButton onPress={onPress}>{children}</StyledButton>;
};
