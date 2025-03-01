import { useThemeStyles } from '@/hooks/useThemeStyles';
import { Pressable, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Typography from '../Typography/Typography';
import { CustomToastProps, getToastStyles } from './constants';

type Props = CustomToastProps;

const SuccessToast = (props: Props) => {
	const theme = useThemeStyles();
	const toastStyles = getToastStyles(theme);

	const hideHandler = () => {
		Toast.hide();
	};
	const color = theme['--toast-success'];
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

export default SuccessToast;

const styles = StyleSheet.create({});
