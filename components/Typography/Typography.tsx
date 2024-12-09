import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

const fontFamilyMap = {
	light: 'Roboto-Light',
	regular: 'Roboto-Regular',
	medium: 'Roboto-Medium',
	bold: 'Roboto-Bold',
};

type TypographyProps = TextProps & {
	variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';
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
	h1: {
		fontSize: 40,
		lineHeight: 40,
	},
	h2: {
		fontSize: 32,
		lineHeight: 32,
	},
	h3: {
		fontSize: 24,
		lineHeight: 28,
	},
	body: {
		fontSize: 16,
		lineHeight: 24,
	},
	caption: {
		fontSize: 12,
		lineHeight: 16,
	},
	label: {
		fontSize: 14,
		lineHeight: 20,
	},
});
