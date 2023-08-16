import { SafeAreaView } from "react-native";

import { SignInButton } from "~/components/SignInButton";

export default function SignIn() {
	return (
		<SafeAreaView className="m-4 flex-1 justify-center">
			<SignInButton />
		</SafeAreaView>
	);
}
