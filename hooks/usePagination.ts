import { axiosInstance } from '@/configs/axios';
import { useCallback, useEffect, useState } from 'react';

interface PaginatedResult<T> {
	data: T[];
	metadata: {
		total: number;
		limit: number;
		page: number;
	};
}

type Params = {
	getQuery: (page: number, limit: number) => string;
	url: string;
	predicate?: boolean;
	queryDependencies?: any[];
};

const LIMIT = 10;

const usePagination = <T>({ getQuery, url, queryDependencies = [], predicate }: Params) => {
	const [initialLoader, setInitialLoader] = useState<boolean>(true);
	const [data, setData] = useState<T[]>([]);
	const [totalResult, setTotalResult] = useState<number>(0);
	const [pageNo, setPageNo] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [refreshing, setRefreshing] = useState<boolean>(false);
	const [loadingMore, setLoadingMore] = useState<boolean>(false);

	const fetchData = async (page: number): Promise<void> => {
		try {
			const query = getQuery(page, LIMIT);
			const result = await axiosInstance
				.get<PaginatedResult<T>>(`${url}?${query}`)
				.then((res) => res.data);

			if (result) {
				setData(page === 1 ? result.data : [...data, ...result.data]);
				setTotalResult(result.metadata.total);
				setPageNo(result.metadata.page);
				setTotalPages(Math.ceil(result.metadata.total / result.metadata.limit));
			} else {
				console.error('Failed to fetch data');
			}
		} catch (error) {
			console.log('Failed to fetch data', error);
		} finally {
			setRefreshing(false);
			setLoadingMore(false);
			setInitialLoader(false);
		}
	};

	useEffect(() => {
		if (!predicate) {
			setData([]);
			return;
		}
		setInitialLoader(true);
		setData([]);
		const timeoutId = setTimeout(() => {
			setPageNo(1);
			fetchData(1);
		}, 500);
		return () => {
			clearTimeout(timeoutId);
		};
	}, [url, ...queryDependencies]);

	const handleRefresh = useCallback(() => {
		setRefreshing(true);
		fetchData(1);
	}, [getQuery, url]);

	const loadMore = () => {
		if (!loadingMore && pageNo < totalPages) {
			setLoadingMore(true);
			fetchData(pageNo + 1);
		}
	};

	return {
		data,
		totalResult,
		refreshing,
		loadingMore,
		handleRefresh,
		loadMore,
		initialLoader,
	};
};

export default usePagination;
