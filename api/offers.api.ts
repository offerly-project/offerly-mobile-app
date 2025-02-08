import { axiosInstance } from '@/configs/axios';
import { IOffer, IOfferMetadata } from '@/entities/offer.entity';
import { AxiosResponse } from 'axios';

interface IGetOfferQuery {
	card: string;
	category: string;
	page: number;
	limit: number;
	q: string;
	sort_by: string;
	sort_direction: string;
}

export class OffersApi {
	public static buildGetOffersQuery = (params: IGetOfferQuery) => {
		const query = new URLSearchParams();
		if (params.card) query.append('card', params.card);
		if (params.category) query.append('category', encodeURI(params.category));
		if (params.page) query.append('page', params.page.toString());
		if (params.limit) query.append('limit', params.limit.toString());
		if (params.sort_by) query.append('sort_by', encodeURI(params.sort_by));
		if (params.sort_direction) query.append('sort_direction', encodeURI(params.sort_direction));
		if (params.q) query.append('q', encodeURI(params.q));

		return query.toString();
	};
	public static getOffers = async (params: IGetOfferQuery) => {
		const query = this.buildGetOffersQuery(params);
		const results = await axiosInstance
			.get(`/user/offers?${query}`)
			.then((res: AxiosResponse<{ data: IOffer[]; metadata: IOfferMetadata }>) => res.data);
		return results.data;
	};

	public static getGuestOffers = async () => {
		const results = await axiosInstance
			.get(`/user/guest/offers`)
			.then((res: AxiosResponse<IOffer[]>) => res.data);
		return results;
	};

	public static getLastChanceOffers = async () => {
		const results = await axiosInstance
			.get(`/user/offers/last-chance`)
			.then((res: AxiosResponse<IOffer[]>) => res.data);
		return results;
	};
	public static getNewlyAddedOffers = async () => {
		const results = await axiosInstance
			.get(`/user/offers/newly-added`)
			.then((res: AxiosResponse<IOffer[]>) => res.data);
		return results;
	};

	public static searchOffers = async (query: string) => {
		const results = await axiosInstance
			.get(`/user/offers?q=${query}&card=*&limit=50`)
			.then((res: AxiosResponse<{ data: IOffer[]; metadata: IOfferMetadata }>) => res.data);
		return results.data;
	};
}
