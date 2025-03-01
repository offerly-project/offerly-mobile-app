import { useThemeStyles } from '@/hooks/useThemeStyles';
import { haptic } from '@/utils/utils';
import { AntDesign } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';

type Props = {
	favorite: boolean;
	onPress: () => void;
};

const FavoriteButton = ({ favorite, onPress }: Props) => {
	const theme = useThemeStyles();
	const scale = useSharedValue(1);
	const opacity = useSharedValue(1);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
		opacity: opacity.value,
	}));

	const handlePress = () => {
		if (!favorite) {
			haptic('impact');
			scale.value = withSpring(1.3, { damping: 8, stiffness: 400 }, () => {
				scale.value = withSpring(1);
			});
		} else {
			scale.value = withTiming(0.9, { duration: 150 }, () => {
				scale.value = withSpring(1);
			});
		}

		onPress();
	};

	return (
		<Pressable onPress={handlePress} hitSlop={20}>
			<Animated.View style={animatedStyle}>
				<AntDesign
					size={22}
					name={favorite ? 'heart' : 'hearto'}
					color={theme['--primary']}
				/>
			</Animated.View>
		</Pressable>
	);
};

export default FavoriteButton;
