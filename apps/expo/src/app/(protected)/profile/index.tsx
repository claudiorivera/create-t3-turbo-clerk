import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAuth, useUser } from "@clerk/clerk-expo";

export default function Profile() {
	const { signOut } = useAuth();
	const { user } = useUser();

	return (
		<View className="flex h-full flex-col items-center justify-center">
			<Text>{user?.username}</Text>
			<TouchableOpacity onPress={() => signOut()}>
				<Text>Sign Out</Text>
			</TouchableOpacity>
		</View>
	);
}
