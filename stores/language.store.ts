import ArabicTranslations from '@/assets/i18n/ar.json';
import EnglishTranslations from '@/assets/i18n/en.json';
import { PlainStorage } from '@/services/storage.services';
import { action, makeAutoObservable } from 'mobx';
import { RootStore } from '.';

export type LanguageType = 'en' | 'ar';

export type Translations = typeof EnglishTranslations | typeof ArabicTranslations;

const RTL_LANGUAGES: LanguageType[] = ['ar'];

export class LanguageStore {
	rootStore: RootStore;
	language: LanguageType = 'en';
	isRtl: boolean = false;
	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
		makeAutoObservable(this);
	}

	getDirection = () => (this.isRtl ? 'rtl' : 'ltr');

	setup = async () => {
		const storedLanguage = await PlainStorage.getItem('language');
		if (storedLanguage) {
			this.language = storedLanguage as LanguageType;
		}
		this.isRtl = RTL_LANGUAGES.includes(this.language);

		this._reactToLanguageChange();
	};

	private _reactToLanguageChange = () => {
		const language = this.language;
		PlainStorage.setItem('language', language);
		this.rootStore.userStore.updateUser({
			language,
		});
		const rtl = RTL_LANGUAGES.includes(language);
		this.isRtl = rtl;
	};

	@action
	setLanguage = (language: LanguageType) => {
		this.language = language;
		this._reactToLanguageChange();
	};

	get translations(): Translations {
		switch (this.language) {
			case 'en':
				return EnglishTranslations;
			case 'ar':
				return ArabicTranslations;
		}
	}
}
