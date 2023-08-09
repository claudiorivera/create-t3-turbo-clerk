import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignOutButton,
} from "@clerk/nextjs";

import { CreatePostExample } from "~/components/create-post-example";
import PostListExample from "~/components/post-list-example";

export default function HomePage() {
	return (
		<div>
			<p>Home Page</p>
			<SignedOut>
				<SignInButton mode="modal">
					<button className="btn">Sign in</button>
				</SignInButton>
			</SignedOut>
			<SignedIn>
				<SignOutButton />
				<PostListExample />
				<CreatePostExample />
			</SignedIn>
		</div>
	);
}
