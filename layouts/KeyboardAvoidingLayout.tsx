import { ReactNode } from 'react';
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';

interface KeyboardAvoidingLayoutProps {
	children: ReactNode;
	className?: string;
}

export default function KeyboardAvoidingLayout({
	children,
	className,
}: KeyboardAvoidingLayoutProps) {
	const animation = useAnimatedKeyboard();
	const paddingBottomStyle = useAnimatedStyle(() => ({
		paddingBottom: animation.height.value,
	}));
	return (
		<Animated.View style={paddingBottomStyle} className={className}>
			{children}
		</Animated.View>
	);
}
