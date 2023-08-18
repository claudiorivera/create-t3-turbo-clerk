import { SafeAreaView } from "react-native";

import { SignInButton } from "~/components/SignInButton";

export default function SignIn() {
	return (
		<SafeAreaView className="m-4 flex-1 justify-center">
			<SignInButton provider="github">Sign In With GitHub</SignInButton>
			<SignInButton provider="google">Sign In With Google</SignInButton>
		</SafeAreaView>
	);
}
