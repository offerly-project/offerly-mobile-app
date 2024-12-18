import { axiosInstance } from '@/configs/axios';

export class FavoritesApi {
	static addFavorite = async (offerId: string) => {
		return axiosInstance.patch('/user/favorites', {
			offers: [offerId],
		});
	};
	static removeFavorite = async (offerId: string) => {
		return axiosInstance.delete('/user/favorites?offers=' + offerId);
	};
}
