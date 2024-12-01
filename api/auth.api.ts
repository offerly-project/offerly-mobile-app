import { axiosInstance } from "@/configs/axios";
import { IUser } from "@/entities/user.entity";
import { AxiosResponse } from "axios";

export class AuthApi {
	static login = async (email: string, password: string) => {
		const data = await axiosInstance
			.post("/user/auth/login", {
				email,
				password,
			})
			.then((res: AxiosResponse<{ user: IUser; token: string }>) => res.data);

		return data!;
	};

	static signup(email: string, password: string, full_name: string) {
		return axiosInstance.post("/user/auth/signup", {
			email,
			password,
			full_name,
		});
	}
}
