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
	const color = theme['--toast-info'];
	return (
		<View style={[toastStyles.container]}>
			<View className='flex flex-row items-start gap-4'>
				<Typography variant='label' color={color} weight='medium'>
					{props.text1}
				</Typography>
				<Pressable hitSlop={TOAST_CLOSE_HIT_SLOP} onPress={hideHandler}>
					<FontAwesome name='close' color={color} />
				</Pressable>
			</View>
		</View>
	);
};

export default InfoToast;

const styles = StyleSheet.create({});
