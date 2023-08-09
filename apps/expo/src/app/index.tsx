import React from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import { FlashList } from "@shopify/flash-list";

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
	const utils = api.useContext();
	const { data: posts = [] } = api.post.all.useQuery();
	const { mutate: createPost } = api.post.create.useMutation({
		onSuccess: async () => {
			await utils.post.all.invalidate();
		},
	});

	return (
		<View className="h-full w-full p-4">
			<Button
				title="Create Random Post"
				onPress={() => {
					createPost({
						title: `Title ${Math.random()}`,
						content: `Content ${Math.random()}`,
					});
				}}
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
