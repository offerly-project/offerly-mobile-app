import { ThemeStyle } from './themes';

export const getBaseScreenLayout = (theme: ThemeStyle): object => {
	return {
		backgroundColor: theme['--background'],
		headerShown: false,
		flex: 1,
	};
};
