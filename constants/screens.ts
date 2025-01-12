import { languageStore } from '@/stores';
import { Dimensions } from 'react-native';
import { ThemeStyle } from './themes';

export const getBaseScreenLayout = (theme: ThemeStyle): object => {
	const animation = languageStore().language === 'ar' ? 'slide_from_left' : 'slide_from_right';
	return {
		backgroundColor: theme['--background'],
		headerShown: false,
		flex: 1,
		animation,
		contentStyle: {
			backgroundColor: theme['--background'],
		},
	};
};

export const getAuthScreenLayout = (theme: ThemeStyle): object => {
	const animation = languageStore().language === 'ar' ? 'slide_from_left' : 'slide_from_right';
	return {
		headerBackVisible: true,
		headerTransparent: true,
		headerTitle: '',
		animation,
		headerTintColor: theme['--primary'],
		headerShown: false,
	};
};

export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;
