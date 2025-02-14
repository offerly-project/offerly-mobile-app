import { useThemeStyles } from '@/hooks/useThemeStyles';
import { languageStore } from '@/stores';
import { Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

type Props = {
	onPress: () => void;
	scrollY: SharedValue<number>;
	style?: StyleProp<ViewStyle>;
};

const GoTopLayout = observer(({ onPress, scrollY, style }: Props) => {
	const theme = useThemeStyles();

	const goTopAnimation = useAnimatedStyle(() => {
		return { opacity: withTiming(scrollY.value > 150 ? 1 : 0, { duration: 250 }) };
	});
	const rtl = languageStore().isRtl;
	return (
		<Animated.View
			style={[
				styles.container,
				goTopAnimation,
				{ backgroundColor: theme['--primary'] },
				style,
				{
					left: rtl ? 25 : undefined,
					right: rtl ? undefined : 25,
				},
			]}
		>
			<TouchableOpacity hitSlop={25} onPress={onPress}>
				<Ionicons size={25} color={theme['--static']} name='arrow-up' />
			</TouchableOpacity>
		</Animated.View>
	);
});
export default GoTopLayout;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 25,
		height: 35,
		width: 35,
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
