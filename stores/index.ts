import { makeAutoObservable, observable } from 'mobx';
import { CardsStore } from './cards.store';
import { FavoritesStore } from './favorites.store';
import { LanguageStore } from './language.store';
import { StaticDataStore } from './static.store';
import { ThemeStore } from './theme.store';
import { UIStore } from './ui.store';
import { UserStore } from './user.store';

export class RootStore {
	@observable userStore: UserStore;
	@observable cardsStore: CardsStore;
	@observable staticDataStore: StaticDataStore;
	@observable favoritesStore: FavoritesStore;
	@observable languageStore: LanguageStore;
	@observable themeStore: ThemeStore;
	@observable uiStore: UIStore;
	constructor() {
		this.userStore = new UserStore(this);
		this.cardsStore = new CardsStore(this);
		this.staticDataStore = new StaticDataStore(this);
		this.favoritesStore = new FavoritesStore(this);
		this.languageStore = new LanguageStore(this);
		this.themeStore = new ThemeStore(this);
		this.uiStore = new UIStore(this);
		makeAutoObservable(this);
	}
}

export const rootStore = new RootStore();

export const userStore = () => rootStore.userStore;

export const cardsStore = () => rootStore.cardsStore;

export const staticDataStore = () => rootStore.staticDataStore;

export const favoritesStore = () => rootStore.favoritesStore;

export const languageStore = () => rootStore.languageStore;

export const uiStore = () => rootStore.uiStore;

export const themeStore = () => rootStore.themeStore;
