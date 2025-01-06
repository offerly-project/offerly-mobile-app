import Link from '@/components/Typography/Link';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { guestSignup } from '@/utils/utils';
import { StyleSheet, View } from 'react-native';

type Props = {};

const CardsGuestMessage = (props: Props) => {
	const theme = useThemeStyles();
	return (
		<View className='h-full w-full justify-center items-center'>
			<Link variant='h3' weight='bold' color={theme['--primary']} onPress={guestSignup}>
				Signup to start adding your cards
			</Link>
		</View>
	);
};

export default CardsGuestMessage;

const styles = StyleSheet.create({});
