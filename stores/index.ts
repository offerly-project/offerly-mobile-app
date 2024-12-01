import { makeAutoObservable, observable } from "mobx";
import { CardsStore } from "./cards.store";
import { UserStore } from "./user.store";

export class RootStore {
	@observable userStore: UserStore;
	@observable cardsStore: CardsStore;
	constructor() {
		this.userStore = new UserStore(this);
		this.cardsStore = new CardsStore(this);
		makeAutoObservable(this);
	}
}

export const rootStore = new RootStore();

export const userStore = () => rootStore.userStore;

export const cardsStore = () => rootStore.cardsStore;
