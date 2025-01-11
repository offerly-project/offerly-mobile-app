import Typography from '@/components/Typography/Typography';
import { ICard } from '@/entities/card.entity';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { languageStore } from '@/stores';
import { formatUploadPath } from '@/utils/utils';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

type Props = {
	card: ICard;
	onPress?: () => void;
	selected?: boolean;
	userCard?: boolean;
	small?: boolean;
};

const CardCard = ({ card, onPress, selected, small, userCard }: Props) => {
	const theme = useThemeStyles();
	const { translations, language } = languageStore();

	const iconContainerClasses = userCard
		? 'bg-primary opacity-50 items-center'
		: 'bg-primary items-center';

	return (
		<View className={`${small ? 'w-[80px]' : 'w-[120px]'} `}>
			<Animated.View
				className={`${!small && 'aspect-square'}`}
				style={[
					selected && !userCard && { backgroundColor: theme['--card'] },
					styles.wrapper,
				]}
			>
				<Pressable
					onPress={onPress}
					disabled={userCard}
					className={`gap-2 px-2 py-1 items-center ${userCard && 'opacity-50'}`}
				>
					<Image
						source={formatUploadPath(card.logo)}
						style={[
							{
								resizeMode: 'contain',
								height: small ? 45 : 70,
								width: '100%',
							},
						]}
					/>
					<Typography
						variant='caption'
						numberOfLines={2}
						// style={styles.cardName}
						color={theme['--text']}
						align='center'
					>
						{language == 'ar' ? card.name.ar : card.name.en}
					</Typography>
				</Pressable>
			</Animated.View>
			{selected && !userCard && (
				<View style={styles.selection_checkmark} className={iconContainerClasses}>
					<Ionicons name='checkmark' size={14} color={theme['--background']} />
				</View>
			)}

			{userCard && (
				<View style={styles.already_added_container}>
					<View className='bg-primary opacity-70 rounded-full px-3 mb-10'>
						<Typography variant='label' color='white' align='center'>
							{translations.tabs.cards.added}
						</Typography>
					</View>
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
		padding: 0,
	},
	wrapper: {
		// borderWidth: 1,
		borderStyle: 'solid',
		borderRadius: 6,
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
		top: -6,
		right: -6,
		height: 20,
		width: 20,
		borderRadius: 50,
		justifyContent: 'center',
		alignContent: 'center',
	},
	already_added_container: {
		position: 'absolute',
		top: 0,
		left: 0,
		height: '100%',
		width: '100%',
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
