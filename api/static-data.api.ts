import { axiosInstance } from '@/configs/axios';
import { AxiosResponse } from 'axios';

export class StaticDataApi {
	static getCategories() {
		return axiosInstance
			.get('/static/categories.json')
			.then((res: AxiosResponse<string[]>) => res.data);
	}

	static getCountries() {
		return axiosInstance
			.get('/static/countries.json')
			.then((res: AxiosResponse<string[]>) => res.data);
	}

	static getLanguages() {
		return axiosInstance
			.get('/static/languages.json')
			.then((res: AxiosResponse<string[]>) => res.data);
	}
}
