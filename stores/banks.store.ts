import { BanksApi } from '@/api/banks.api';
import { IBank } from '@/entities/bank.entity';
import { action, computed, makeAutoObservable, observable, runInAction } from 'mobx';
import { RootStore } from '.';

export class BanksStore {
	@observable private _banks: Record<string, IBank> = {};
	rootStore: RootStore;

	constructor(rootStore: RootStore) {
		this._banks = {};
		makeAutoObservable(this);
		this.rootStore = rootStore;
	}

	@action
	fetchBanks = async () => {
		const banks = await BanksApi.fetchBanks();
		runInAction(() => {
			banks.forEach((bank) => {
				this._banks[bank.id] = bank;
			});
		});
	};

	@computed
	get banksList() {
		return Object.values(this._banks);
	}

	public getBankById = (id: string) => {
		return this._banks[id];
	};
}
