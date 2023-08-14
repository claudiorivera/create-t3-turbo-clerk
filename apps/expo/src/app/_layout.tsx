import React from "react";
import { Pressable } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { router, Stack, Tabs } from "expo-router";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

import { TRPCProvider } from "~/utils/api";
import { tokenCache } from "~/utils/cache";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) throw new Error("Missing Clerk publishable key");

const RootLayout = () => {
	return (
		<ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
			<TRPCProvider>
				<SafeAreaProvider>
					<SignedOut>
						<Stack>
							<Stack.Screen
								name="index"
								options={{
									title: "Sign In",
								}}
							/>
						</Stack>
					</SignedOut>
					<SignedIn>
						<Tabs>
							<Tabs.Screen
								name="index"
								options={{
									href: null,
								}}
							/>
							<Tabs.Screen
								name="posts/new/index"
								options={{
									title: "New Post",
									href: null,
									headerLeft: () => (
										<Pressable
											onPress={() => router.replace("/posts")}
											className="px-4"
										>
											<Ionicons
												name="chevron-back-outline"
												size={24}
												color="black"
											/>
										</Pressable>
									),
								}}
							/>
							<Tabs.Screen
								name="posts/index"
								options={{
									title: "Posts",
									href: {
										pathname: "/posts",
									},
									tabBarIcon: ({ color, size }) => (
										<Ionicons name="ios-newspaper" size={size} color={color} />
									),
									headerRight: () => (
										<Pressable
											onPress={() => router.replace("/posts/new")}
											className="px-4"
										>
											<Ionicons name="add" size={24} />
										</Pressable>
									),
								}}
							/>
							<Tabs.Screen
								name="account/index"
								options={{
									title: "Account",
									href: {
										pathname: "/account",
									},
									tabBarIcon: ({ color, size }) => (
										<Ionicons name="person" size={size} color={color} />
									),
								}}
							/>
						</Tabs>
					</SignedIn>
				</SafeAreaProvider>
			</TRPCProvider>
		</ClerkProvider>
	);
};

export default RootLayout;
