import { Stack } from "expo-router";

export default function ProtectedLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="(tabs)" />
			<Stack.Screen
				name="new-post-modal"
				options={{
					title: "New Post",
					presentation: "modal",
					headerShown: true,
				}}
			/>
		</Stack>
	);
}
