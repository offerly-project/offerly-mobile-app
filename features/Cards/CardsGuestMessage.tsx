import Link from '@/components/Typography/Link';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { languageStore } from '@/stores';
import { guestSignup } from '@/utils/utils';
import { StyleSheet, View } from 'react-native';

type Props = {};

const CardsGuestMessage = (props: Props) => {
	const theme = useThemeStyles();
	const { translations } = languageStore();
	return (
		<View className='h-full w-full justify-center items-center'>
			<Link variant='body' weight='bold' color={theme['--primary']} onPress={guestSignup}>
				{translations.guest.cards}
			</Link>
		</View>
	);
};

export default CardsGuestMessage;

const styles = StyleSheet.create({});
