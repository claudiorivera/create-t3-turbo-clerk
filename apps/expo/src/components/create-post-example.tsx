import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

import { api } from "~/utils/api";

export function CreatePostExample() {
	const utils = api.useContext();
	const { userId } = useAuth();

	const [title, setTitle] = React.useState("");
	const [content, setContent] = React.useState("");

	const { mutate, error } = api.post.create.useMutation({
		async onSuccess() {
			setTitle("");
			setContent("");
			await utils.post.all.invalidate();
		},
	});

	return (
		<View className="mt-4">
			<TextInput
				className="mb-2 rounded bg-white/10 p-2 text-white"
				placeholderTextColor="rgba(255, 255, 255, 0.5)"
				value={title}
				onChangeText={setTitle}
				placeholder="Title"
			/>
			{error?.data?.zodError?.fieldErrors.title && (
				<Text className="mb-2 text-red-500">
					{error.data.zodError.fieldErrors.title}
				</Text>
			)}
			<TextInput
				className="mb-2 rounded bg-white/10 p-2 text-white"
				placeholderTextColor="rgba(255, 255, 255, 0.5)"
				value={content}
				onChangeText={setContent}
				placeholder="Content"
			/>
			{error?.data?.zodError?.fieldErrors.content && (
				<Text className="mb-2 text-red-500">
					{error.data.zodError.fieldErrors.content}
				</Text>
			)}
			<TouchableOpacity
				className="rounded bg-pink-400 p-2"
				onPress={() => {
					mutate({
						content,
						userId,
					});
				}}
			>
				<Text className="font-semibold text-white">Publish post</Text>
			</TouchableOpacity>
		</View>
	);
}
