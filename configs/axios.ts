import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
	timeout: 10000,
});

// Log requests and URLs
axiosInstance.interceptors.request.use(
	(config) => {
		// write log here for request full url
		if (config.url) {
			config.url = encodeURI(config.url);
		}
		console.log('Request:', config.url);

		return config;
	},
	(error) => {
		console.log('Request Error:', error);

		return Promise.reject(error);
	},
);

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
