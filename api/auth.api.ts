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

	static logout = async () => {
		return await axiosInstance
			.post('/user/auth/logout')
			.then((res: AxiosResponse<{ message: string }>) => res.data);
	};

	static guestToken = async () => {
		return await axiosInstance
			.get('/user/guest/token')
			.then((res: AxiosResponse<{ token: string }>) => res.data);
	};

	static forgotPassword = async (email: string) => {
		return await axiosInstance
			.post('/otp/generate', {
				email,
				source: 'password-reset',
			})
			.then((res: AxiosResponse<{ message: string; expiry: number }>) => res.data);
	};

	static resetPasswordByOldPassword = async (oldPassword: string, newPassword: string) => {
		return await axiosInstance
			.put('/user/auth/reset-password', {
				old_password: oldPassword,
				new_password: newPassword,
			})
			.then((res: AxiosResponse<{ message: string; token: string }>) => res.data);
	};

	static resetPasswordByOtp = async (token: string, password: string) => {
		return await axiosInstance
			.put(
				'/user/auth/reset-password',
				{
					new_password: password,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			.then((req: AxiosResponse<{ token: string; message: string }>) => req.data);
	};
}
