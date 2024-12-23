import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

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
};

const Typography: React.FC<TypographyProps> = ({
	variant = 'body',
	color = '#000',
	align = 'left',
	weight = 'regular',
	style,
	children,

	...rest
}) => {
	const fontStyles = {
		...styles[variant],
		fontFamily: fontFamilyMap[weight],
		color,
		textAlign: align,
	};

	return (
		<Text style={[fontStyles, style]} {...rest}>
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
