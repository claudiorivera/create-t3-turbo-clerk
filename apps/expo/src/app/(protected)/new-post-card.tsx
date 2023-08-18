import { useState } from "react";
import { Pressable, SafeAreaView, Text, TextInput, View } from "react-native";
import { router } from "expo-router";

import { api } from "~/utils/api";

export default function NewPostCard() {
	const utils = api.useContext();

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const { mutate, error } = api.post.create.useMutation({
		async onSuccess() {
			setTitle("");
			setContent("");
			await utils.post.all.invalidate();
			router.push("..");
		},
	});

	return (
		<SafeAreaView>
			<View className="px-4 pt-4">
				<View className="flex flex-col gap-2">
					<TextInput
						className="rounded border border-gray-500 p-2"
						value={title}
						onChangeText={setTitle}
						placeholder="Title"
					/>
					{error?.data?.zodError?.fieldErrors.title && (
						<Text className="text-red-700">
							{error.data.zodError.fieldErrors.title}
						</Text>
					)}
					<TextInput
						className="rounded border border-gray-500 p-2"
						value={content}
						onChangeText={setContent}
						placeholder="Content"
					/>
					{error?.data?.zodError?.fieldErrors.content && (
						<Text className="text-red-700">
							{error.data.zodError.fieldErrors.content}
						</Text>
					)}
					<Pressable
						className="w-full rounded bg-blue-500 px-4 py-2"
						onPress={() => {
							mutate({
								title,
								content,
							});
						}}
					>
						<Text className="font-semibold text-white">Submit</Text>
					</Pressable>
				</View>
			</View>
		</SafeAreaView>
	);
}
