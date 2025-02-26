import { ThemeStyle } from '@/constants/themes';
import { StyleSheet } from 'react-native';
import { BaseToastProps, ToastProps } from 'react-native-toast-message';

export const getToastStyles = (theme: ThemeStyle) =>
	StyleSheet.create({
		container: {
			borderRadius: 8,
			padding: 8,
			maxWidth: '75%',
			backgroundColor: theme['--toast-bg'],
		},
	});

export type CustomToastProps = ToastProps & BaseToastProps;

export const TOAST_CLOSE_HIT_SLOP = 14;
export const SLIDERS_HEIGHT = 290;
export const SLIDER_SKELETON_HEIGHT = 215;
export const SLIDER_SKELETON_WIDTH = 140;
