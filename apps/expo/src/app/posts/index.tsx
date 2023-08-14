import { Text, View } from "react-native";

import { api } from "~/utils/api";

export default function Posts() {
	const { data: posts = [] } = api.post.all.useQuery();

	return (
		<View>
			{posts.map((post) => (
				<Text key={post.id}>{post.title}</Text>
			))}
		</View>
	);
}
