import { themes, ThemeStyle } from '@/constants/themes';
import { SecureStore } from '@/services/secure-store.service';
import { vars } from 'nativewind';
import { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme, View } from 'react-native';

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
	const scheme = useColorScheme();
	const [theme, setTheme] = useState<ThemeNameType>((scheme as ThemeNameType) || 'light');
	useEffect(() => {
		const loadTheme = async () => {
			const storedTheme = await SecureStore.getItem('theme');
			if (storedTheme) {
				setTheme(storedTheme as ThemeNameType);
			}
		};
		loadTheme();
	}, []);

	const changeTheme = async (newTheme: ThemeNameType) => {
		setTheme(newTheme);
		await SecureStore.setItem('theme', newTheme);
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
