import { useThemeStyles } from '@/hooks/useThemeStyles';
import Ionicons from '@expo/vector-icons/Feather';
import { StyleSheet, View } from 'react-native';
import Typography from '../Typography/Typography';

type Props = {
	message: string;
};

const NoData = ({ message }: Props) => {
	const theme = useThemeStyles();
	return (
		<View className='h-full w-full items-center justify-center gap-4'>
			<Ionicons name={'x-circle'} color={theme['--danger']} size={35} />
			<Typography variant='h3' color={theme['--danger']}>
				{message}
			</Typography>
		</View>
	);
};

export default NoData;

const styles = StyleSheet.create({});
