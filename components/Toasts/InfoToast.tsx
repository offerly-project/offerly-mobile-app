import { useThemeStyles } from '@/hooks/useThemeStyles';
import { FontAwesome } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Typography from '../Typography/Typography';
import { CustomToastProps, getToastStyles, TOAST_CLOSE_HIT_SLOP } from './constants';

type Props = CustomToastProps;

const InfoToast = (props: Props) => {
	const theme = useThemeStyles();
	const toastStyles = getToastStyles(theme);
	useEffect(() => {
		Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
	}, []);
	const hideHandler = () => {
		Toast.hide();
	};
	const pressAndClose = () => {
		if (props.onPress) {
			props.onPress();
			hideHandler();
		}
	};
	const color = theme['--toast-info'];
	return (
		<Pressable style={[toastStyles.container]} onPress={pressAndClose}>
			<View className='flex flex-row items-start gap-4'>
				<View className='flex-col'>
					<Typography variant='label' color={theme['--shade']} weight='medium'>
						{props.text1}
					</Typography>
					{props.text2 && (
						<Typography variant='label' color={color} weight='medium'>
							{props.text2}
						</Typography>
					)}
				</View>
				<Pressable hitSlop={TOAST_CLOSE_HIT_SLOP} onPress={hideHandler}>
					<FontAwesome name='close' color={color} />
				</Pressable>
			</View>
		</Pressable>
	);
};

export default InfoToast;

const styles = StyleSheet.create({});
