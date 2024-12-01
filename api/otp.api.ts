import { axiosInstance } from "@/configs/axios";
import { AxiosResponse } from "axios";

export class OtpApi {
	static verifyOtp = async (email: string, otp: string) => {
		return axiosInstance
			.post("/user/auth/verify-otp", {
				email,
				otp,
			})
			.then((res: AxiosResponse<{ token: string }>) => res.data.token);
	};
}
