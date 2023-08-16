import React from "react";
import type { GestureResponderEvent } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";

export const StyledButton = ({
	onPress,
	children,
}: {
	onPress?: (event: GestureResponderEvent) => void;
	children: React.ReactNode;
}) => (
	<TouchableOpacity onPress={onPress}>
		<View className="mb-4 w-full rounded bg-blue-500 px-4 py-2">
			<Text className="text-center font-bold text-white">{children}</Text>
		</View>
	</TouchableOpacity>
);
