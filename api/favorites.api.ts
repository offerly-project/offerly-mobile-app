import { axiosInstance } from '@/configs/axios';
import { IOffer } from '@/entities/offer.entity';
import { AxiosResponse } from 'axios';

export class FavoritesApi {
	static addFavorite = async (offerId: string) => {
		return axiosInstance.patch('/user/favorites', {
			offers: [offerId],
		});
	};
	static removeFavorite = async (offerId: string) => {
		return axiosInstance.delete('/user/favorites?offers=' + offerId);
	};
	static getFavorites = async () => {
		return axiosInstance
			.get('/user/favorites')
			.then((res: AxiosResponse<IOffer[]>) => res.data);
	};
}
