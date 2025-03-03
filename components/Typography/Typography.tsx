import { useThemeStyles } from '@/hooks/useThemeStyles';
import React from 'react';
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native';

const fontFamilyMap = {
	light: 'Tajawal-Light',
	regular: 'Tajawal-Regular',
	medium: 'Tajawal-Medium',
	bold: 'Tajawal-Bold',
};

type TypographyProps = TextProps & {
	variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label' | 'title';
	color?: string;
	align?: 'left' | 'center' | 'right' | 'justify';
	weight?: 'light' | 'regular' | 'medium' | 'bold';
	numeric?: boolean;
};

const Typography: React.FC<TypographyProps> = ({
	variant = 'body',
	align = 'left',
	weight = 'regular',
	style,
	children,

	numeric,
	...rest
}) => {
	const theme = useThemeStyles();
	const fontStyles = {
		...styles[variant],
		fontFamily: fontFamilyMap[weight],
		color: rest.color ? rest.color : theme['--text'],
		textAlign: align,
		...(numeric ? { fontVariant: ['tabular-nums'] } : {}),
	};

	return (
		<Text style={[fontStyles as StyleProp<TextStyle>, style]} {...rest}>
			{children}
		</Text>
	);
};

export default Typography;

const styles = StyleSheet.create({
	title: {
		fontSize: 28,
		lineHeight: 34,
	},
	h1: {
		fontSize: 40,
		lineHeight: 42,
	},
	h2: {
		fontSize: 32,
		lineHeight: 34,
	},
	h3: {
		fontSize: 24,
		lineHeight: 30,
	},
	body: {
		fontSize: 16,
		lineHeight: 26,
	},
	caption: {
		fontSize: 12,
		lineHeight: 18,
	},
	label: {
		fontSize: 14,
		lineHeight: 22,
	},
});
