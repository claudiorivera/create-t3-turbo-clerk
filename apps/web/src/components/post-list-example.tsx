"use client";

import { api } from "~/utils/api";

export default function PostListExample() {
	const { data: posts } = api.post.all.useQuery();

	return (
		<div>
			{posts?.map((post) => (
				<div key={post.id}>
					<h2 className="font-bold">{post.title}</h2>
					<p>{post.content}</p>
				</div>
			))}
		</div>
	);
}
