import ArabicTranslations from '@/assets/i18n/ar.json';
import EnglishTranslations from '@/assets/i18n/en.json';
import { PlainStorage } from '@/services/storage.services';
import { action } from 'mobx';
import { RootStore } from '.';

export type LanguageType = 'en' | 'ar';

export type Translations = typeof EnglishTranslations | typeof ArabicTranslations;

export class LanguageStore {
	rootStore: RootStore;
	language: LanguageType = 'en';
	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	setup = async () => {
		const storedLanguage = await PlainStorage.getItem('language');
		if (storedLanguage) {
			this.language = storedLanguage as LanguageType;
		}
	};

	@action
	setLanguage = (language: LanguageType) => {
		this.language = language;
		PlainStorage.setItem('language', language);
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
