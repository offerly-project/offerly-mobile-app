import { PlainStorage } from '@/services/storage.services';
import { action, makeAutoObservable, observable } from 'mobx';
import { RootStore } from '.';

const uiStoreStateKeys = ['cards-select:bank'] as const;
export type UIStoreStateKey = (typeof uiStoreStateKeys)[number];

export type UIStoreState = Partial<Record<UIStoreStateKey, any>>;

export class UIStore {
	rootStore: RootStore;
	@observable state: UIStoreState = {} as UIStoreState;
	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
		makeAutoObservable(this);
	}

	setup = async () => {
		for (const key of uiStoreStateKeys) {
			const storedValue = await PlainStorage.getItem(key);
			if (storedValue) {
				this.state[key] = JSON.parse(storedValue);
			}
		}
	};

	getValue = (key: UIStoreStateKey) => {
		return this.state[key] || null;
	};

	@action
	setValue = (key: UIStoreStateKey, value: any) => {
		if (!value) {
			PlainStorage.deleteItem(key);
			delete this.state[key];
			return;
		}
		this.state[key] = value;
		PlainStorage.setItem(key, JSON.stringify(value));
	};
}
