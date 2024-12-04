import Typography from '@/components/Typography/Typography';
import { ICard } from '@/entities/card.entity';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { formatUploadPath } from '@/utils/utils';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

type Props = {
	card: ICard;
	onPress: () => void;
	selected?: boolean;
	disabled?: boolean;
};

const CardCard = ({ card, onPress, selected, disabled }: Props) => {
	const theme = useThemeStyles();

	return (
		<Pressable
			className={`w-full bg-[rgba(255,255,255,1)]  p-8 rounded-2xl gap-8 ${disabled ? 'opacity-50' : ''}`}
			disabled={disabled}
			style={{
				borderStyle: 'solid',
				borderWidth: 1,
				borderColor: selected ? theme['--primary-3'] : 'transparent',
			}}
			onPress={onPress}
		>
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
});
