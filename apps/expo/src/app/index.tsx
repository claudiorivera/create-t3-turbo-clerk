import React from "react";
import { Button, RefreshControl, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import { FlashList } from "@shopify/flash-list";
import { Controller, useForm } from "react-hook-form";

import { api } from "~/utils/api";
import SignIn from "~/components/SignIn";
import { usePullToRefresh } from "~/hooks/usePullToRefresh";

const Index = () => {
	return (
		<SafeAreaView className="h-full p-4">
			<Stack.Screen options={{ title: "Home" }} />
			<SignedIn>
				<SignOutButton />
				<PostsList />
				<Form />
			</SignedIn>
			<SignedOut>
				<SignIn />
			</SignedOut>
		</SafeAreaView>
	);
};

export default Index;

const SignOutButton = () => {
	const { signOut } = useAuth();

	return (
		<View className="mb-4">
			<Button
				title="Sign Out"
				onPress={() => {
					void signOut();
				}}
			/>
		</View>
	);
};

const PostsList = () => {
	const { data: posts = [], refetch } = api.post.all.useQuery();
	const { isRefreshing, onRefresh } = usePullToRefresh(refetch);

	return (
		<View className="h-full">
			<FlashList
				data={posts}
				estimatedItemSize={20}
				ItemSeparatorComponent={() => <View className="h-2" />}
				renderItem={(p) => (
					<View>
						<Text className="text-md font-semibold">{p.item.title}</Text>
						<Text>{p.item.content}</Text>
					</View>
				)}
				refreshControl={
					<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
				}
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
		<View className="mt-auto">
			<View className="mb-4">
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

			<View className="mb-4">
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

			<View className="mb-4">
				<Button
					title="Submit"
					onPress={handleSubmit((values) => createPost(values))}
				/>
			</View>
		</View>
	);
};
