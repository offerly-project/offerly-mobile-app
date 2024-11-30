import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
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
