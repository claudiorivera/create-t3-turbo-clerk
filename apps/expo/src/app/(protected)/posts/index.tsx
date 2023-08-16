import { Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { api } from "~/utils/api";

export default function Posts() {
	const { data: posts = [] } = api.post.all.useQuery();

	return (
		<View className="h-full px-4 pt-4">
			<FlashList
				data={posts}
				keyExtractor={(post) => post.id}
				renderItem={({ item: post }) => (
					<View>
						<Text>{post.title}</Text>
					</View>
				)}
				ItemSeparatorComponent={() => <View className="h-2" />}
				estimatedItemSize={50}
			/>
		</View>
	);
}
