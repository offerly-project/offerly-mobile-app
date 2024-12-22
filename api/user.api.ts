import { axiosInstance } from '@/configs/axios';
import { AxiosResponse } from 'axios';

export class UserApi {
	static signup(email: string, password: string, full_name: string) {
		return axiosInstance
			.post('/user/signup', {
				email,
				password,
				full_name,
			})
			.then((res: AxiosResponse<any>) => res.data);
	}
}
