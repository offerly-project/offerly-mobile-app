import Link from '@/components/Typography/Link';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { languageStore } from '@/stores';
import { guestSignup } from '@/utils/utils';
import { StyleSheet, View } from 'react-native';

type Props = {};

const GuestOffersMessage = (props: Props) => {
	const theme = useThemeStyles();
	const { translations } = languageStore();
	return (
		<View className='w-full justify-center items-center pb-10'>
			<Link variant='body' color={theme['--primary']} weight='bold' onPress={guestSignup}>
				{translations.guest.offers}
			</Link>
		</View>
	);
};

export default GuestOffersMessage;

const styles = StyleSheet.create({});
