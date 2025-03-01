import { useThemeStyles } from '@/hooks/useThemeStyles';
import { Pressable, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Typography from '../Typography/Typography';
import { CustomToastProps, getToastStyles } from './constants';

type Props = CustomToastProps;

const ErrorToast = (props: Props) => {
	const theme = useThemeStyles();
	const toastStyles = getToastStyles(theme);

	const hideHandler = () => {
		Toast.hide();
	};
	const color = theme['--toast-error'];
	const pressAndClose = () => {
		if (props.onPress) {
			props.onPress();
			hideHandler();
		}
	};
	return (
		<Pressable style={[toastStyles.container]} onPress={pressAndClose}>
			<View className='flex flex-row items-start gap-4'>
				<Typography variant='label' color={color} weight='medium'>
					{props.text1}
				</Typography>
			</View>
		</Pressable>
	);
};

export default ErrorToast;

const styles = StyleSheet.create({});
