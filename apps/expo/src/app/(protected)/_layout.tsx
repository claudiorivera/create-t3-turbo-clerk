import { Pressable, Text } from "react-native";
import { Link, Stack } from "expo-router";

export default function ProtectedLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="(tabs)" />
			<Stack.Screen
				name="new-post-card"
				options={{
					title: "New Post",
					presentation: "card",
					headerShown: true,
					headerLeft: () => (
						<Link asChild href="..">
							<Pressable className="pr-4">
								<Text>Cancel</Text>
							</Pressable>
						</Link>
					),
				}}
			/>
		</Stack>
	);
}
