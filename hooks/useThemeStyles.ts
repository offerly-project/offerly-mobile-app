import { themes } from '@/constants/themes';
import { useThemeContext } from '@/contexts/ThemeContext';

export const useThemeStyles = () => {
	const { theme } = useThemeContext();

	return themes[theme];
};
