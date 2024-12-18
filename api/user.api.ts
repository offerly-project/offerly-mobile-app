import { axiosInstance } from '@/configs/axios';

export class UserApi {
	static signup(email: string, password: string, full_name: string) {
		return axiosInstance.post('/user/auth/signup', {
			email,
			password,
			full_name,
		});
	}
}
