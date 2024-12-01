import { axiosInstance } from "@/configs/axios";
import { IOffer, IOfferMetadata } from "@/entities/offer.entity";
import { AxiosResponse } from "axios";

interface IGetOfferQuery {
	card: string;
	category: string;
	page: number;
	limit: number;
	q: string;
}

export class OffersApi {
	private static buildGetOffersQuery = (params: IGetOfferQuery) => {
		const query = new URLSearchParams();
		query.append("card", params.card);
		query.append("category", params.category);
		query.append("page", params.page.toString());
		query.append("limit", params.limit.toString());
		query.append("q", params.q);
		return query.toString();
	};
	public static getOffers = async (params: IGetOfferQuery) => {
		const results = await axiosInstance
			.get(`/user/offers?${this.buildGetOffersQuery(params)}`, { params })
			.then(
				(res: AxiosResponse<{ data: IOffer[]; metadata: IOfferMetadata }>) =>
					res.data
			);
		return results.data;
	};
}
