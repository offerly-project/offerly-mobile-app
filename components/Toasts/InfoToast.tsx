import { useThemeStyles } from '@/hooks/useThemeStyles';
import { Pressable, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Typography from '../Typography/Typography';
import { CustomToastProps, getToastStyles } from './constants';

type Props = CustomToastProps;

const InfoToast = (props: Props) => {
	const theme = useThemeStyles();
	const toastStyles = getToastStyles(theme);

	const hideHandler = () => {
		Toast.hide();
	};
	const pressAndClose = () => {
		if (props.onPress) {
			props.onPress();
			hideHandler();
		}
	};
	const color = theme['--primary'];
	return (
		<Pressable style={[toastStyles.container]} onPress={pressAndClose}>
			<View className='flex flex-row items-start gap-4'>
				<View className='flex-col'>
					{props.text1 && (
						<Typography variant='label' color={theme['--shade']} weight='medium'>
							{props.text1}
						</Typography>
					)}
					{props.text2 && (
						<Typography variant='label' color={color} weight='medium'>
							{props.text2}
						</Typography>
					)}
				</View>
			</View>
		</Pressable>
	);
};

export default InfoToast;

const styles = StyleSheet.create({});
