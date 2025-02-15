import { useThemeStyles } from '@/hooks/useThemeStyles';
import { FontAwesome } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Typography from '../Typography/Typography';
import { CustomToastProps, getToastStyles, TOAST_CLOSE_HIT_SLOP } from './constants';

type Props = CustomToastProps;

const SuccessToast = (props: Props) => {
	const theme = useThemeStyles();
	const toastStyles = getToastStyles(theme);
	useEffect(() => {
		Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
	}, []);
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
				<Typography variant='label' color={theme['--shade']} weight='medium'>
					{props.text1}
				</Typography>
				<Pressable hitSlop={TOAST_CLOSE_HIT_SLOP} onPress={hideHandler}>
					<FontAwesome name='close' color={color} />
				</Pressable>
			</View>
		</Pressable>
	);
};

export default SuccessToast;

const styles = StyleSheet.create({});
