export const formatUploadPath = (path: string) => {
	return `${process.env.EXPO_PUBLIC_BASE_API_URL}/uploads${path}`;
};

export const wait = (timeout: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, timeout);
	});
};
