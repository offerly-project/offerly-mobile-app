import { Dimensions } from 'react-native';
import { ThemeStyle } from './themes';

export const getBaseScreenLayout = (theme: ThemeStyle): object => {
	return {
		backgroundColor: theme['--background'],
		headerShown: false,
		flex: 1,
		contentStyle: {
			backgroundColor: theme['--background'],
		},
	};
};

export const getAuthScreenLayout = (theme: ThemeStyle): object => {
	return {
		headerBackVisible: true,
		headerTransparent: true,
		headerTitle: '',
		headerTintColor: theme['--primary'],
		headerShown: false,
	};
};

export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;
