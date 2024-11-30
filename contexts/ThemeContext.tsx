import { createContext, useContext, useState } from "react";
import { useColorScheme } from "react-native";

type ThemeNameType = "light" | "dark";

type Context = {
	theme: ThemeNameType;
	switchTheme: (name: ThemeNameType) => void;
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
			{children}
		</ThemeContext.Provider>
	);
};

export const useThemeContext = () => useContext(ThemeContext);
