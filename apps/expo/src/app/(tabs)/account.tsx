import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as WebBrowser from "expo-web-browser";
import {
	SignedIn,
	SignedOut,
	useAuth,
	useOAuth,
	useUser,
} from "@clerk/clerk-expo";

import { StyledButton } from "~/components/StyledButton";
import { useWarmUpBrowser } from "~/hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

export default function Accout() {
	const { signOut } = useAuth();
	const { user } = useUser();

	return (
		<View className="flex h-full flex-col items-center justify-center">
			<SignedIn>
				<Text>{user?.username}</Text>
				<TouchableOpacity onPress={() => signOut()}>
					<Text>Sign Out</Text>
				</TouchableOpacity>
			</SignedIn>
			<SignedOut>
				<SignIn />
			</SignedOut>
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
