import React from "react";
import { Platform, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import type { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { BottomTabBar } from "@react-navigation/bottom-tabs";

export default function TabsLayout() {
	return (
		<SafeAreaView className="h-full">
			<Tabs
				initialRouteName="home"
				screenOptions={{
					tabBarStyle: Platform.OS === "ios" && {
						backgroundColor: "transparent",
					},
					headerShown: true,
					header: (props) => <TabHeader {...props} />,
				}}
				tabBar={(props) =>
					Platform.OS === "ios" ? (
						<BlurView
							style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
							intensity={95}
						>
							<BottomTabBar {...props} />
						</BlurView>
					) : (
						<BottomTabBar {...props} />
					)
				}
			>
				<Tabs.Screen
					name="home"
					options={{
						href: "/home",
						title: "",
						tabBarIcon: ({ color }) => (
							<View
								style={{
									flexDirection: "column",
									alignItems: "center",
									marginTop: 17,
									backgroundColor: "transparent",
								}}
							>
								<TabBarIcon name="home" color={color} size={24} />
								<Text style={{ marginTop: 5, fontSize: 10, opacity: 0.5 }}>
									Home
								</Text>
							</View>
						),
					}}
				/>
				<Tabs.Screen
					name="account"
					options={{
						title: "",
						href: {
							pathname: "/account",
						},
						tabBarIcon: ({ color }) => (
							<View
								style={{
									flexDirection: "column",
									alignItems: "center",
									marginTop: 17,
									backgroundColor: "transparent",
								}}
							>
								<TabBarIcon name="user" color={color} size={24} />
								<Text style={{ marginTop: 5, fontSize: 10, opacity: 0.5 }}>
									Account
								</Text>
							</View>
						),
					}}
				/>
			</Tabs>
		</SafeAreaView>
	);
}

function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>["name"];
	color: string;
	size?: number;
}) {
	return (
		<FontAwesome
			size={props.size ?? 26}
			style={{ marginBottom: -3 }}
			{...props}
		/>
	);
}

const TabHeader = ({
	navigation,
	layout,
	options,
	route,
}: BottomTabHeaderProps) => {
	console.log(JSON.stringify({ navigation, layout, options, route }), null, 2);
	return (
		<View>
			<Text className="text-red-500">{route.name}</Text>
		</View>
	);
};
