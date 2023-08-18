import { SafeAreaView, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { api } from "~/utils/api";

export default function UsersList() {
	const { data: users = [] } = api.user.all.useQuery();

	return (
		<SafeAreaView className="h-full">
			<FlashList
				data={users}
				keyExtractor={(user) => user.id}
				renderItem={({ item: user }) => (
					<View>
						<Text className="text-black">{user.username}</Text>
					</View>
				)}
				estimatedItemSize={10}
			/>
		</SafeAreaView>
	);
}
