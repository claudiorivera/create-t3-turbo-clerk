import { SignOutButton } from "@clerk/nextjs";

import { CreatePostExample } from "~/components/create-post-example";
import PostListExample from "~/components/post-list-example";

export default function HomePage() {
	return (
		<div className="flex h-screen flex-col gap-4 p-4">
			<SignOutButton>
				<button className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
					Sign Out
				</button>
			</SignOutButton>
			<PostListExample />
			<CreatePostExample />
		</div>
	);
}
