import ArabicTranslations from '@/assets/i18n/ar.json';
import EnglishTranslations from '@/assets/i18n/en.json';
import { PlainStorage } from '@/services/storage.services';
import { reloadAsync } from 'expo-updates';
import { action, makeAutoObservable } from 'mobx';
import { I18nManager } from 'react-native';
import { RootStore, userStore } from '.';

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

	setup = async () => {
		const storedLanguage = await PlainStorage.getItem('language');
		if (storedLanguage) {
			this.language = storedLanguage as LanguageType;
		}

		this._reactToLanguageChange();
	};

	private _reactToLanguageChange = () => {
		const rtl = RTL_LANGUAGES.includes(this.language);
		this.isRtl = rtl;
		I18nManager.forceRTL(rtl);
		I18nManager.allowRTL(rtl);
	};

	@action
	setLanguage = (language: LanguageType) => {
		this.language = language;
		PlainStorage.setItem('language', language);
		userStore().updateUser({
			language,
		});
		this._reactToLanguageChange();
		if (this.isRtl) {
			reloadAsync();
		}
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
