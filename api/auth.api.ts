import { axiosInstance } from '@/configs/axios';
import { IUser } from '@/entities/user.entity';
import { AxiosResponse } from 'axios';

export class AuthApi {
	static login = async (email: string, password: string) => {
		const data = await axiosInstance
			.post('/user/auth/login', {
				email,
				password,
			})
			.then((res: AxiosResponse<{ user: IUser; token: string }>) => res.data);

		return data!;
	};

	static checkAuth = async () => {
		return axiosInstance.get('/user/auth').then((res) => res.data);
	};

	static forgotPassword = async (email: string) => {
		return await axiosInstance
			.post('/user/auth/forgot-password', {
				email,
			})
			.then((res: AxiosResponse<{ message: string; timer: number }>) => res.data);
	};

	static resetPassword = async (email: string, password: string) => {
		return axiosInstance
			.post('/user/auth/reset-password', {
				email,
				password,
			})
			.then((req: AxiosResponse<{ token: string }>) => req.data.token);
	};
}
