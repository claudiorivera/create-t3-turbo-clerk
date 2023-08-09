import type { ExpoConfig } from "@expo/config";

const projectId = process.env.EAS_PROJECT_ID;

if (!projectId) {
	throw new Error(
		"Please set the EAS_PROJECT_ID environment variable to your EAS project ID.",
	);
}

const defineConfig = (): ExpoConfig => ({
	name: "t3-turbo-clerk",
	slug: "t3-turbo-clerk",
	scheme: "t3-turbo-clerk",
	version: "1.0.0",
	orientation: "portrait",
	icon: "./assets/icon.png",
	userInterfaceStyle: "light",
	splash: {
		image: "./assets/icon.png",
		resizeMode: "contain",
		backgroundColor: "#1F104A",
	},
	updates: {
		fallbackToCacheTimeout: 0,
	},
	assetBundlePatterns: ["**/*"],
	ios: {
		supportsTablet: true,
		bundleIdentifier: "com.claudiorivera.t3-turbo-clerk",
	},
	android: {
		adaptiveIcon: {
			foregroundImage: "./assets/icon.png",
			backgroundColor: "#1F104A",
		},
	},
	extra: {
		eas: {
			projectId,
		},
	},
	experiments: {
		tsconfigPaths: true,
	},
	plugins: ["./expo-plugins/with-modify-gradle.js"],
});

export default defineConfig;
