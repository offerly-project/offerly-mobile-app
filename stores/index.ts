import { makeAutoObservable, observable } from "mobx";
import { BanksStore } from "./banks.store";
import { UserStore } from "./user.store";

export class RootStore {
	@observable userStore: UserStore;
	@observable bankStore: BanksStore;
	constructor() {
		this.userStore = new UserStore(this);
		this.bankStore = new BanksStore(this);
		makeAutoObservable(this);
	}
}

export const rootStore = new RootStore();

export const userStore = () => rootStore.userStore;

export const bankStore = () => rootStore.bankStore;
