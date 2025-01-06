import Link from '@/components/Typography/Link';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { guestSignup } from '@/utils/utils';
import { StyleSheet, View } from 'react-native';

type Props = {};

const GuestOffersMessage = (props: Props) => {
	const theme = useThemeStyles();
	return (
		<View className='w-full justify-center items-center'>
			<Link variant='h3' color={theme['--primary']} weight='bold' onPress={guestSignup}>
				Sign up to access all offers
			</Link>
		</View>
	);
};

export default GuestOffersMessage;

const styles = StyleSheet.create({});
