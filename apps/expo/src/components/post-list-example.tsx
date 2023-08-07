import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

export const PostListExample = () => {
	const utils = api.useContext();

	const postQuery = api.post.all.useQuery();

	const deletePostMutation = api.post.delete.useMutation({
		onSettled: () => utils.post.all.invalidate(),
	});

	return (
		<>
			<FlashList
				data={postQuery.data}
				estimatedItemSize={20}
				ItemSeparatorComponent={() => <View className="h-2" />}
				renderItem={(p) => (
					<PostCard
						post={p.item}
						onDelete={() => deletePostMutation.mutate(p.item.id)}
					/>
				)}
			/>
		</>
	);
};

function PostCard(props: {
	post: RouterOutputs["post"]["all"][number];
	onDelete: () => void;
}) {
	const router = useRouter();

	return (
		<View className="flex flex-row rounded-lg bg-white/10 p-4">
			<View className="flex-grow">
				<TouchableOpacity onPress={() => router.push(`/post/${props.post.id}`)}>
					<Text className="mt-2 text-white">{props.post.content}</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity onPress={props.onDelete}>
				<Text className="font-bold uppercase text-pink-400">Delete</Text>
			</TouchableOpacity>
		</View>
	);
}
