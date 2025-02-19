import { axiosInstance } from '@/configs/axios';
import { AxiosResponse } from 'axios';

export interface ICategory {
	id: string;
	name: string;
}

export interface ICountry {
	name: string;
	phone_code: string;
	country_code: string;
}

export class StaticDataApi {
	static getCategories() {
		return axiosInstance
			.get('/static/categories')
			.then((res: AxiosResponse<ICategory[]>) => res.data);
	}

	static getCountries() {
		return axiosInstance
			.get('/static/countries')
			.then((res: AxiosResponse<ICountry[]>) => res.data);
	}
}
