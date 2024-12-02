import * as Haptics from 'expo-haptics';
import React from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';

type Variants = 'primary' | 'secondary';

const COLORING: Record<Variants, string> = {
	primary: 'bg-primary-1',
	secondary: 'bg-secondary-1',
};

type ButtonProps = {
	variant?: Variants;
	disabled?: boolean;
	loading?: boolean;
	hapticFeedback?: boolean;
	loadingComponent?: React.ReactNode;
} & React.ComponentProps<typeof TouchableOpacity>;

const Button: React.FC<ButtonProps> = ({
	variant = 'primary',
	children,
	onPress,
	disabled = false,
	loading = false,
	hapticFeedback = false,
	loadingComponent,
	...rest
}) => {
	const isDisabled = disabled || loading;
	const buttonStyles = `rounded-2xl ${COLORING[variant]} ${isDisabled ? 'opacity-40' : ''} p-4`;

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
			className={[buttonStyles, rest.className].join(' ')}
		>
			{loading ? loadingComponent : children}
		</TouchableOpacity>
	);
};

export default Button;
