import { themes } from "@/constants/themes";
import { createContext, useContext, useState } from "react";
import { useColorScheme, View } from "react-native";

type ThemeNameType = "light" | "dark";

type Context = {
	theme: ThemeNameType;
	switchTheme: (theme: ThemeNameType) => void;
};

const ThemeContext = createContext<Context>({} as Context);

type Props = {
	children: React.ReactNode;
};

export const ThemeContextProvider = ({ children }: Props) => {
	const scheme = useColorScheme();
	const [theme, setTheme] = useState<ThemeNameType>(scheme as ThemeNameType);
	return (
		<ThemeContext.Provider value={{ theme, switchTheme: setTheme }}>
			<View className="flex-1" style={themes[theme]}>
				{children}
			</View>
		</ThemeContext.Provider>
	);
};

export const useThemeContext = () => useContext(ThemeContext);
