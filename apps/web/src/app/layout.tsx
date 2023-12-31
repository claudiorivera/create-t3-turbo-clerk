import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "~/styles/globals.css";

import { headers } from "next/headers";

import { TRPCReactProvider } from "./providers";

const fontSans = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "Create T3 Turbo w/ Clerk Demo",
	description: "Simple monorepo with shared backend for web & mobile apps",
	openGraph: {
		title: "Create T3 Turbo",
		description: "Simple monorepo with shared backend for web & mobile apps",
		url: "https://create-t3-turbo.vercel.app",
		siteName: "Create T3 Turbo",
	},
};

export default function Layout(props: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={["font-sans", fontSans.variable].join(" ")}>
					<TRPCReactProvider headers={headers()}>
						{props.children}
					</TRPCReactProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
