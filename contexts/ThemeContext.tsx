import { themes, ThemeStyle } from '@/constants/themes';
import { PlainStorage } from '@/services/storage.services';
import { themeStore } from '@/stores';
import { vars } from 'nativewind';
import { createContext, useContext, useState } from 'react';
import { View } from 'react-native';

export type ThemeNameType = 'light' | 'dark';

type Context = {
	theme: ThemeNameType;
	switchTheme: (theme: ThemeNameType) => void;
};

const ThemeContext = createContext<Context>({} as Context);

type Props = {
	children: (theme: ThemeStyle) => React.ReactNode;
};

export const ThemeContextProvider = ({ children }: Props) => {
	const themeName = themeStore().theme;
	const [theme, setTheme] = useState<ThemeNameType>(themeName);

	const changeTheme = async (newTheme: ThemeNameType) => {
		setTheme(newTheme);
		await PlainStorage.setItem('theme', newTheme);
	};

	return (
		<ThemeContext.Provider value={{ theme, switchTheme: changeTheme }}>
			<View className='flex-1' style={vars(themes[theme])}>
				{children(themes[theme])}
			</View>
		</ThemeContext.Provider>
	);
};

export const useThemeContext = () => useContext(ThemeContext);
