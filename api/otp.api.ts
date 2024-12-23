import { axiosInstance } from '@/configs/axios';
import { AxiosResponse } from 'axios';

export class OtpApi {
	static verifyOtp = async (otp: string, email: string) => {
		return await axiosInstance
			.post('/otp/verify', {
				email,
				otp,
			})
			.then((res: AxiosResponse<{ token: string }>) => res.data.token);
	};
}
