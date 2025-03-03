import { axiosInstance } from '@/configs/axios';
import { IUser, PatchUserData } from '@/entities/user.entity';
import { AxiosResponse } from 'axios';

export class UserApi {
	static async signup(email: string, password: string, full_name: string) {
		return axiosInstance
			.post('/user/signup', {
				email,
				password,
				full_name,
			})
			.then((res: AxiosResponse<any>) => res.data);
	}

	static async deleteAccount() {
		return axiosInstance.delete('/user/user');
	}

	static async me() {
		return axiosInstance.get('/user/user').then((res: AxiosResponse<IUser>) => res.data);
	}

	static async userContact(subject: string, message: string) {
		return axiosInstance.post('/user/user/contact', {
			subject,
			message,
		});
	}

	static async guestContact(email: string, subject: string, message: string) {
		return axiosInstance.post('/user/guest/contact', {
			email,
			subject,
			message,
		});
	}

	static async patchUser(user: PatchUserData) {
		return axiosInstance.patch('/user/user', {
			...user,
		});
	}
}
