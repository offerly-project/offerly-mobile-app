import Typography from '@/components/Typography/Typography';
import { ICard } from '@/entities/card.entity';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { formatUploadPath } from '@/utils/utils';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

type Props = {
	card: ICard;
	onPress: () => void;
	selected?: boolean;
};

const CardCard = ({ card, onPress, selected }: Props) => {
	const theme = useThemeStyles();

	return (
		<Pressable onPress={onPress}>
			<View className={`w-full bg-[rgba(255,255,255,1)] relative  p-8 rounded-2xl gap-8`}>
				<Image source={formatUploadPath(card.logo)} style={styles.cardLogo} />

				<View>
					<Typography variant='body' color={theme['--primary-2']}>
						{card.name.en}
					</Typography>
					<Typography variant='body' color={theme['--primary-3']}>
						{card.scheme.en}
					</Typography>
					<Typography variant='body' color={theme['--secondary-1']}>
						{card.grade.en}
					</Typography>
				</View>
			</View>
			{selected && (
				<View style={[styles.selection_overlay]} className='rounded-2xl'>
					<View style={[styles.checkmark_container]} className={'bg-primary-1'}>
						<Ionicons name='checkmark' size={50} />
					</View>
				</View>
			)}
		</Pressable>
	);
};

export default CardCard;

const styles = StyleSheet.create({
	cardLogo: {
		resizeMode: 'cover',
		height: 175,
		borderRadius: 12,
	},
	selection_overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(255,255,255,0.5)',
	},
	checkmark_container: {
		padding: 10,
		borderRadius: 10,
	},
});
