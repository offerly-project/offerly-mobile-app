import { ICountry, StaticDataApi } from '@/api/static-data.api';
import { RootStore } from '.';

export class StaticDataStore {
	categories: Record<string, string> = {};
	countries: ICountry[] = [];

	rootStore: RootStore;
	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}
	async fetchStaticData() {
		Promise.all([StaticDataApi.getCategories(), StaticDataApi.getCountries()]).then(
			([categories, countries]) => {
				this.categories = Object.fromEntries(
					categories.map((category) => [category.name, category.id]),
				);
				this.countries = countries;
			},
		);
	}
}
