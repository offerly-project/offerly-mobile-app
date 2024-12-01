import { BanksApi } from "@/api/banks.api";
import { Bank } from "@/entities/bank.entity";
import { computed, makeAutoObservable, observable } from "mobx";
import { RootStore } from ".";

export class BanksStore {
	rootStore: RootStore;
	@observable private _banks: Record<string, Bank> = {};

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
		makeAutoObservable(this);
	}
	fetchBanks = async () => {
		try {
			const banks = await BanksApi.fetchBanks();
			banks.forEach((bank) => {
				this._banks[bank.id] = new Bank(bank);
			});
		} catch (e) {
			console.log(e);
		}
	};

	@computed
	get bankList() {
		return Object.values(this._banks);
	}

	getBankById = (id: string) => {
		return this._banks[id];
	};

	getBankByName = (name: string) => {
		return this.bankList.find((bank) => bank.name === name);
	};

	getBankByType = (type: string) => {
		return this.bankList.filter((bank) => bank.type === type);
	};

	getBankByCountry = (country: string) => {
		return this.bankList.filter((bank) => bank.country === country);
	};

	getBankByStatus = (status: string) => {
		return this.bankList.filter((bank) => bank.status === status);
	};
}
