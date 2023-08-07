import React from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

function PostCard(props: {
	post: RouterOutputs["post"]["all"][number];
	onDelete: () => void;
}) {
	const router = useRouter();

	return (
		<View className="flex flex-row rounded-lg bg-white/10 p-4">
			<View className="flex-grow">
				<TouchableOpacity onPress={() => router.push(`/post/${props.post.id}`)}>
					<Text className="text-xl font-semibold text-pink-400">
						{props.post.title}
					</Text>
					<Text className="mt-2 text-white">{props.post.content}</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity onPress={props.onDelete}>
				<Text className="font-bold uppercase text-pink-400">Delete</Text>
			</TouchableOpacity>
		</View>
	);
}

const Index = () => {
	const utils = api.useContext();

	const postQuery = api.post.all.useQuery();

	const deletePostMutation = api.post.delete.useMutation({
		onSettled: () => utils.post.all.invalidate(),
	});

	return (
		<SafeAreaView className="bg-[#1F104A]">
			{/* Changes page title visible on the header */}
			<Stack.Screen options={{ title: "Home Page" }} />
			<View className="h-full w-full p-4">
				<Text className="mx-auto pb-2 text-5xl font-bold text-white">
					Create <Text className="text-pink-400">T3</Text> Turbo
				</Text>

				<Button
					onPress={() => void utils.post.all.invalidate()}
					title="Refresh posts"
					color={"#f472b6"}
				/>

				<View className="py-2">
					<Text className="font-semibold italic text-white">
						Press on a post
					</Text>
				</View>

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
			</View>
		</SafeAreaView>
	);
};

export default Index;
