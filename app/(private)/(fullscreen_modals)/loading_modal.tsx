import { useThemeStyles } from '@/hooks/useThemeStyles';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

type Props = {};

const LoadingModal = (props: Props) => {
	const theme = useThemeStyles();
	return (
		<View className='absolute top-0 left-0 w-full h-full flex-col items-center justify-center'>
			<ActivityIndicator
				color={theme['--primary']}
				style={{
					transform: [{ scale: 1.25 }],
				}}
			/>
		</View>
	);
};

export default LoadingModal;

const styles = StyleSheet.create({});
