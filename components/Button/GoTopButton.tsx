import { useThemeStyles } from '@/hooks/useThemeStyles';
import { Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

type Props = {
	onPress: () => void;
	scrollY: SharedValue<number>;
	style?: StyleProp<ViewStyle>;
	offsetX?: number;
	offsetY?: number;
};

const GoTopLayout = observer(({ onPress, scrollY, style, offsetX = 0, offsetY = 0 }: Props) => {
	const theme = useThemeStyles();

	const goTopAnimation = useAnimatedStyle(() => {
		return {
			opacity: withTiming(scrollY.value > 150 ? 1 : 0, { duration: 250 }),
			transform: [
				{
					translateY: withTiming(scrollY.value > 150 ? 0 : 25, { duration: 250 }),
				},
			],
		};
	});

	return (
		<Animated.View
			style={[
				styles.container,
				goTopAnimation,
				{ backgroundColor: theme['--primary'] },
				style,
				{
					bottom: 25 + offsetY,
					right: 25 + offsetX,
				},
			]}
		>
			<Pressable hitSlop={25} onTouchEnd={onPress}>
				<Ionicons size={25} color={theme['--static']} name='arrow-up' />
			</Pressable>
		</Animated.View>
	);
});
export default GoTopLayout;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		height: 35,
		width: 35,
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
