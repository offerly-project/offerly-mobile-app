import * as Haptics from 'expo-haptics';
import React from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';

type Variants = 'primary' | 'secondary';
type BorderStyles = 'filled' | 'outlined' | 'ghost';

const COLORING: Record<Variants, string> = {
	primary: 'primary',
	secondary: 'secondary',
};

const BORDER_STYLE: Record<BorderStyles, string> = {
	filled: 'bg',
	outlined: `border-2 border`,
	ghost: 'bg-transparent',
};

type ButtonProps = {
	variant?: Variants;
	borderStyle?: BorderStyles;
	disabled?: boolean;
	loading?: boolean;
	hapticFeedback?: boolean;
	loadingComponent?: React.ReactNode;
} & React.ComponentProps<typeof TouchableOpacity>;

const Button: React.FC<ButtonProps> = ({
	variant = 'primary',
	borderStyle = 'outlined',
	children,
	onPress,
	disabled = false,
	loading = false,
	hapticFeedback = false,
	loadingComponent,
	...rest
}) => {
	const isDisabled = disabled || loading;

	const buttonStyle = (function () {
		const styles = `rounded-full h-[40] items-center flex flex-row justify-center`;
		return `${styles} ${BORDER_STYLE[borderStyle]}-${COLORING[variant]} ${isDisabled && 'opacity-60'}`;
	})();

	const handlePress = (event: GestureResponderEvent) => {
		if (hapticFeedback) {
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		}
		if (onPress) {
			onPress(event);
		}
	};

	return (
		<TouchableOpacity
			onPress={handlePress}
			disabled={isDisabled}
			activeOpacity={0.8}
			{...rest}
			className={[buttonStyle, rest.className].join(' ')}
		>
			{loading ? loadingComponent : children}
		</TouchableOpacity>
	);
};

export default Button;
