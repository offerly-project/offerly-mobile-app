import { axiosInstance } from '@/configs/axios';
import { IUser } from '@/entities/user.entity';
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

	static async me() {
		return axiosInstance.get('/user/user').then((res: AxiosResponse<IUser>) => res.data);
	}
}
