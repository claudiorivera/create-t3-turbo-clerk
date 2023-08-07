"use client";

import { api } from "~/utils/api";

export default function PostListExample() {
	const { data: posts } = api.post.all.useQuery();

	return (
		<div>
			{posts?.map((post) => (
				<div key={post.id}>
					<p>{post.content}</p>
				</div>
			))}
		</div>
	);
}
