import { useState } from "react";

export const usePullToRefresh = (refetch: () => Promise<unknown>) => {
	const [isRefreshing, setIsRefreshing] = useState(false);

	const onRefresh = () => {
		setIsRefreshing(true);
		void refetch().finally(() => setIsRefreshing(false));
	};

	return {
		isRefreshing,
		onRefresh,
	};
};
