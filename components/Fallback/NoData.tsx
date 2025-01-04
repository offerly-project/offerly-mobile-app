import { useThemeStyles } from '@/hooks/useThemeStyles';
import Ionicons from '@expo/vector-icons/FontAwesome5';
import { StyleSheet, View } from 'react-native';
import Typography from '../Typography/Typography';

type Props = {
	message: string;
};

const NoData = ({ message }: Props) => {
	const theme = useThemeStyles();
	return (
		<View className='h-full w-full items-center justify-center gap-4'>
			<Ionicons name='meh-blank' color={theme['--primary']} size={50} />
			<Typography variant='h3' color={theme['--primary']}>
				{message}
			</Typography>
		</View>
	);
};

export default NoData;

const styles = StyleSheet.create({});
