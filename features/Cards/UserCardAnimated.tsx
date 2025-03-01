import { ComponentProps, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import CardCard from './CardCard';

type Props = {
	removing: boolean;
} & ComponentProps<typeof CardCard>;

const UserCardAnimated = ({ removing, ...props }: Props) => {
	const sv = useSharedValue(1);
	useEffect(() => {
		sv.value = withTiming(removing ? 0 : 1, {
			duration: 200,
		});
	}, [removing, sv]);
	const animationStyle = useAnimatedStyle(() => ({
		opacity: sv.value,
		transform: [{ translateY: interpolate(sv.value, [0, 1], [-100, 0]) }],
	}));
	return (
		<Animated.View className={'mx-2'} style={[animationStyle]}>
			<CardCard {...props} />
		</Animated.View>
	);
};

export default UserCardAnimated;

const styles = StyleSheet.create({});
