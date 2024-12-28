import { FavoritesApi } from '@/api/favorites.api';
import { IOffer } from '@/entities/offer.entity';
import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import { RootStore } from '.';

export class FavoritesStore {
	rootStore: RootStore;
	@observable favorites: string[] = [];
	@observable offers: IOffer[] = [];
	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
		makeAutoObservable(this);
	}
	addFavorite = async (offer: IOffer) => {
		FavoritesApi.addFavorite(offer.id);
		runInAction(() => {
			this.favorites = [...this.favorites, offer.id];
			this.offers = [...this.offers, offer];
		});
	};

	@action
	setFavorites = (favorites: string[]) => {
		this.favorites = favorites;
	};

	removeFavorite = async (offer: IOffer) => {
		FavoritesApi.removeFavorite(offer.id);
		runInAction(() => {
			this.favorites = this.favorites.filter((id) => id !== offer.id);
			this.offers = this.offers.filter((offer) => offer.id !== offer.id);
		});
	};
	getFavorites = async () => {
		FavoritesApi.getFavorites().then((offers) => {
			runInAction(() => {
				this.offers = offers;
			});
		});
	};

	isFavorite = (offerId: string) => {
		return this.favorites.includes(offerId);
	};
}
