import { StaticDataApi } from '@/api/static-data.api';
import { RootStore } from '.';

export class StaticDataStore {
	categories: string[] = [];
	countries: string[] = [];
	languages: string[] = [];
	rootStore: RootStore;
	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}
	async fetchStaticData() {
		Promise.all([
			StaticDataApi.getCategories(),
			StaticDataApi.getCountries(),
			StaticDataApi.getLanguages(),
		]).then(([categories, countries, languages]) => {
			this.categories = categories;
			this.countries = countries;
			this.languages = languages;
		});
	}
}
