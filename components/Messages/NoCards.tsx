import { useThemeStyles } from '@/hooks/useThemeStyles';
import { languageStore } from '@/stores';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Link from '../Typography/Link';
import Typography from '../Typography/Typography';

type Props = {};

const NoCards = (props: Props) => {
	const theme = useThemeStyles();
	const translations = languageStore().translations;
	return (
		<View className='items-center justify-center flex-1'>
			<Typography variant='body' color={theme['--text']}>
				{translations.noCards.title}
			</Typography>
			<Link onPress={() => router.push('/(private)/select_cards')} color={theme['--primary']}>
				{translations.noCards.link}
			</Link>
		</View>
	);
};

export default NoCards;

const styles = StyleSheet.create({});
