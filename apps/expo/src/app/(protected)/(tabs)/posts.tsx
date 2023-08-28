import { useState } from "react";
import { Pressable, Switch, Text, View } from "react-native";
import { Link, Tabs } from "expo-router";
import { FlashList } from "@shopify/flash-list";

import { api } from "~/utils/api";
import { usePullToRefresh } from "~/hooks/usePullToRefresh";

export default function Posts() {
	const [shouldFilterForMyPosts, setShouldFilterForMyPosts] = useState(false);

	const { data: posts = [], refetch } = shouldFilterForMyPosts
		? api.post.mine.useQuery()
		: api.post.all.useQuery();

	const { isRefreshing, onRefresh } = usePullToRefresh(refetch);

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
					headerLeft: () => (
						<View className="flex flex-row items-center px-4">
							<Text>All</Text>
							<Switch
								value={shouldFilterForMyPosts}
								onValueChange={setShouldFilterForMyPosts}
							/>
							<Text>Mine</Text>
						</View>
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
				onRefresh={onRefresh}
				refreshing={isRefreshing}
			/>
		</View>
	);
}
