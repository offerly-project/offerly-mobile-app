import { makeAutoObservable, observable } from "mobx";
import { UserStore } from "./user.store";

export class RootStore {
	@observable userStore: UserStore;
	constructor() {
		this.userStore = new UserStore(this);
		makeAutoObservable(this);
	}
}

export const rootStore = new RootStore();

export const userStore = () => rootStore.userStore;
