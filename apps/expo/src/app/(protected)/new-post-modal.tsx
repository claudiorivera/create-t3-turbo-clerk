import { Pressable, SafeAreaView, Text } from "react-native";
import { Link } from "expo-router";

export default function NewPostModal() {
	return (
		<SafeAreaView className="flex-1 justify-center">
			<Link asChild href="..">
				<Pressable>
					<Text>Back</Text>
				</Pressable>
			</Link>
		</SafeAreaView>
	);
}
