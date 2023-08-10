import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import { FlashList } from "@shopify/flash-list";
import { Controller, useForm } from "react-hook-form";

import { api } from "~/utils/api";
import SignIn from "~/components/SignIn";

const SignOut = () => {
	const { isLoaded, signOut } = useAuth();

	if (!isLoaded) {
		return null;
	}

	return (
		<View>
			<Button
				title="Sign Out"
				onPress={() => {
					void signOut();
				}}
			/>
		</View>
	);
};

const Index = () => {
	return (
		<SafeAreaView>
			<Stack.Screen options={{ title: "Home" }} />
			<View className="h-full w-full p-4">
				<SignedIn>
					<SignOut />
					<PostsList />
				</SignedIn>
				<SignedOut>
					<SignIn />
				</SignedOut>
			</View>
		</SafeAreaView>
	);
};

export default Index;

const PostsList = () => {
	const { data: posts = [] } = api.post.all.useQuery();
	const utils = api.useContext();

	return (
		<View className="h-full w-full p-4">
			<Form />
			<Button
				onPress={() => void utils.post.all.invalidate()}
				title="Refresh posts"
			/>
			<FlashList
				data={posts}
				estimatedItemSize={20}
				ItemSeparatorComponent={() => <View className="h-2" />}
				renderItem={(p) => (
					<View>
						<Text className="text-lg font-bold">{p.item.title}</Text>
						<Text>{p.item.content}</Text>
					</View>
				)}
			/>
		</View>
	);
};

const Form = () => {
	const utils = api.useContext();

	const { mutate: createPost } = api.post.create.useMutation({
		onSuccess: async () => {
			reset({
				title: "",
				content: "",
			});
			await utils.post.all.invalidate();
		},
	});

	const {
		control,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<{
		title: string;
		content: string;
	}>({
		defaultValues: {
			title: "",
			content: "",
		},
	});

	return (
		<View className="flex flex-col gap-4">
			<View>
				<Text>Title</Text>
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							className="rounded border p-2"
							onBlur={onBlur}
							onChangeText={(value) => onChange(value)}
							value={value}
							autoCapitalize="words"
							placeholder="Title"
						/>
					)}
					name="title"
					rules={{ required: true }}
				/>
				{errors.title?.type === "required" && (
					<Text className="text-red-500">Required</Text>
				)}
			</View>

			<View>
				<Text>Content</Text>
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							className="rounded border p-2"
							onBlur={onBlur}
							onChangeText={(value) => onChange(value)}
							value={value}
						/>
					)}
					name="content"
					rules={{ required: true }}
				/>
				{errors.content?.type === "required" && (
					<Text className="text-red-500">Required</Text>
				)}
			</View>

			<Button
				title="Submit"
				onPress={handleSubmit((values) => createPost(values))}
			/>
		</View>
	);
};
