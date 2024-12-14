import Typography from '@/components/Typography/Typography';
import { ICard } from '@/entities/card.entity';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { formatUploadPath } from '@/utils/utils';
import { Image } from 'expo-image';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

type Props = {
	card: ICard;
	onPress: () => void;
	selected?: boolean;
	style?: StyleProp<ViewStyle>;
};

const CardCard = ({ card, onPress, selected, style }: Props) => {
	const theme = useThemeStyles();

	// Animated style for the container
	const animatedStyle = useAnimatedStyle(() => {
		return {
			borderColor: withTiming(selected ? theme['--primary-1'] : 'transparent', {
				duration: 200,
			}),
		};
	}, [selected]);

	return (
		<Animated.View style={[styles.container, animatedStyle, style]}>
			<Pressable onPress={onPress} style={{ flex: 1, height: '100%', width: '100%' }}>
				<Image source={formatUploadPath(card.logo)} style={styles.cardLogo} />
				<Typography variant='caption' style={styles.cardName} color={theme['--primary-2']}>
					{card.name.en}
				</Typography>
			</Pressable>
		</Animated.View>
	);
};

export default CardCard;

const styles = StyleSheet.create({
	container: {
		minHeight: 100,
		width: '31%',
		alignItems: 'flex-start',
		borderRadius: 12,
		padding: 4,
		borderWidth: 1,
		borderStyle: 'solid',
	},
	cardLogo: {
		resizeMode: 'contain',
		borderRadius: 12,
		height: 50,
		width: 100,
	},
	cardName: {
		fontSize: 10,
	},
});
