import { Tabs } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
	const { isSignedIn } = useAuth();

	return (
		<Tabs>
			<Tabs.Screen
				name="posts"
				options={{
					title: "Posts",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="ios-newspaper" size={size} color={color} />
					),
				}}
				redirect={!isSignedIn}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="person" size={size} color={color} />
					),
				}}
				redirect={!isSignedIn}
			/>
		</Tabs>
	);
}