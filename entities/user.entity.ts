import { FavoritesApi } from '@/api/favorites.api';
import { action, makeAutoObservable, observable, runInAction } from 'mobx';

export interface IUser {
	email: string;
	full_name: string;
	favorites: string[];
}

export class User {
	email: string;
	full_name: string;
	token: string;
	@observable favorites: string[] = [];
	constructor(user: IUser, token: string) {
		this.email = user.email;
		this.full_name = user.full_name;
		this.favorites = user.favorites;
		this.token = token;
		makeAutoObservable(this);
	}

	isFavorite = (offerId: string) => {
		return this.favorites.includes(offerId);
	};

	getFavoriteOffers = () => {
		return this.favorites;
	};

	@action
	addFavoriteOffer = (offerId: string) => {
		FavoritesApi.addFavorite(offerId)
			.then(() => {
				runInAction(() => {
					this.favorites.push(offerId);
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	@action
	removeFavoriteOffer = (offerId: string) => {
		FavoritesApi.removeFavorite(offerId)
			.then(() => {
				runInAction(() => {
					this.favorites = this.favorites.filter((id) => id !== offerId);
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
}
