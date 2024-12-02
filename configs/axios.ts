import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
});

// Log requests and URLs
axiosInstance.interceptors.request.use((config) => {
	console.log(`Request URL: ${config.baseURL}${config.url}`);
	console.log(`Request Method: ${config.method}`);
	if (config.headers) {
		console.log('Request Headers:', config.headers);
	}
	if (config.data) {
		console.log('Request Data:', config.data);
	}
	return config;
});

export class AxiosAuthInterceptorManager {
	private static interceptorId: number;
	static addInterceptor(token: string) {
		this.interceptorId = axiosInstance.interceptors.request.use((config) => {
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		});
	}
	static removeInterceptor() {
		axiosInstance.interceptors.request.eject(this.interceptorId);
	}
}
