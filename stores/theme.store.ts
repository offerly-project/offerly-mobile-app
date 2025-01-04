import { ThemeNameType } from '@/contexts/ThemeContext';
import { PlainStorage } from '@/services/storage.services';
import { action, makeAutoObservable } from 'mobx';
import { Appearance } from 'react-native';
import { RootStore } from '.';

export class ThemeStore {
	private rootStore: RootStore;
	theme: ThemeNameType = Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
		makeAutoObservable(this);
	}

	@action
	setup = async () => {
		const storedTheme = await PlainStorage.getItem('theme');
		if (storedTheme) {
			this.theme = storedTheme as ThemeNameType;
		}
	};

	@action
	setTheme = async (newTheme: ThemeNameType) => {
		this.theme = newTheme;
		PlainStorage.setItem('theme', newTheme);
	};
}
