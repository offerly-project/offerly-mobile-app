import Typography from '@/components/Typography/Typography';
import { ICard } from '@/entities/card.entity';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { formatUploadPath } from '@/utils/utils';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { DimensionValue, Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

type Props = {
	card: ICard;
	onPress: () => void;
	selected?: boolean;
	style?: StyleProp<ViewStyle>;
	height: DimensionValue;
	width: DimensionValue;
	logoHeight: DimensionValue;
	logoWidth: DimensionValue;
};

const CardCard = ({
	card,
	logoHeight,
	logoWidth,
	onPress,
	selected,
	style,
	height,
	width,
}: Props) => {
	const theme = useThemeStyles();

	const animatedStyle = useAnimatedStyle(() => {
		return {
			borderColor: withTiming(selected ? theme['--selected'] : 'transparent', {
				duration: 200,
			}),
		};
	}, [selected]);

	return (
		<View style={[styles.container, { height, width }]}>
			<Animated.View
				style={[animatedStyle, style, { backgroundColor: theme['--card'] }, styles.wrapper]}
			>
				<Pressable onPress={onPress} style={{ flex: 1 }} className='px-4 items-center'>
					<Image
						source={formatUploadPath(card.logo)}
						style={[
							styles.cardLogo,
							{
								height: logoHeight,
								width: logoWidth,
							},
						]}
					/>
					<Typography
						variant='caption'
						numberOfLines={2}
						style={styles.cardName}
						color={theme['--text']}
					>
						{card.name.en}
					</Typography>
				</Pressable>
			</Animated.View>
			{selected && (
				<View style={styles.selection_checkmark} className='bg-primary items-center'>
					<Ionicons name='checkmark' size={14} color={theme['--background']} />
				</View>
			)}
		</View>
	);
};

export default CardCard;

const styles = StyleSheet.create({
	container: {
		alignItems: 'flex-start',
		position: 'relative',
		padding: 4,
	},
	wrapper: {
		borderWidth: 1,
		borderStyle: 'solid',
		borderRadius: 12,
		height: '100%',
		width: '100%',
	},
	cardLogo: {
		resizeMode: 'contain',
		borderRadius: 12,
		marginTop: 4,
	},
	cardName: {
		fontSize: 10,
	},
	selection_checkmark: {
		position: 'absolute',
		top: 0,
		right: 0,
		height: 20,
		width: 20,
		borderRadius: 50,
		justifyContent: 'center',
		alignContent: 'center',
	},
});
