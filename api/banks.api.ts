import { axiosInstance } from "@/configs/axios";
import { IBank } from "@/entities/bank.entity";
import { AxiosResponse } from "axios";

export class BanksApi {
	static async fetchBanks() {
		return axiosInstance
			.get("/user/banks")
			.then((res: AxiosResponse<IBank[]>) => res.data);
	}
}
