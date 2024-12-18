import { makeAutoObservable, observable } from 'mobx';
import { CardsStore } from './cards.store';
import { FavoritesStore } from './favorites.store';
import { StaticDataStore } from './static.store';
import { UserStore } from './user.store';

export class RootStore {
	@observable userStore: UserStore;
	@observable cardsStore: CardsStore;
	@observable staticDataStore: StaticDataStore;
	@observable favoritesStore: FavoritesStore;
	constructor() {
		this.userStore = new UserStore(this);
		this.cardsStore = new CardsStore(this);
		this.staticDataStore = new StaticDataStore(this);
		this.favoritesStore = new FavoritesStore(this);
		makeAutoObservable(this);
	}
}

export const rootStore = new RootStore();

export const userStore = () => rootStore.userStore;

export const cardsStore = () => rootStore.cardsStore;

export const staticDataStore = () => rootStore.staticDataStore;

export const favoritesStore = () => rootStore.favoritesStore;
