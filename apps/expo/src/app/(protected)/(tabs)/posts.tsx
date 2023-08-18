import { Pressable, Text, View } from "react-native";
import { Link, Tabs } from "expo-router";
import { FlashList } from "@shopify/flash-list";

import { api } from "~/utils/api";

export default function Posts() {
	const { data: posts = [] } = api.post.all.useQuery();

	return (
		<View className="h-full px-4 pt-4">
			<Tabs.Screen
				options={{
					headerRight: () => (
						<Link asChild href="/new-post-card">
							<Pressable className="px-4">
								<Text>New Post</Text>
							</Pressable>
						</Link>
					),
				}}
			/>
			<FlashList
				data={posts}
				keyExtractor={(post) => post.id}
				renderItem={({ item: post }) => (
					<View>
						<Text>
							{post.user.firstName} {post.user.lastName}
						</Text>
						<Text className="font-bold">{post.title}</Text>
						<Text>{post.content}</Text>
					</View>
				)}
				ItemSeparatorComponent={() => <View className="h-2" />}
				estimatedItemSize={50}
			/>
		</View>
	);
}
