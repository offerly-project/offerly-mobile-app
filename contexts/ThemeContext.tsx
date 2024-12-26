import { themes, ThemeStyle } from '@/constants/themes';
import { vars } from 'nativewind';
import { createContext, useContext, useState } from 'react';
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
	const [theme, setTheme] = useState<ThemeNameType>('light' || (scheme as ThemeNameType));

	return (
		<ThemeContext.Provider value={{ theme, switchTheme: setTheme }}>
			<View className='flex-1' style={vars(themes[theme])}>
				{children(themes[theme])}
			</View>
		</ThemeContext.Provider>
	);
};

export const useThemeContext = () => useContext(ThemeContext);
