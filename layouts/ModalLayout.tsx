import CloseButton from '@/components/Button/CloseButton';
import Typography from '@/components/Typography/Typography';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { router } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ToastLayout from './ToastLayout';

type Props = {
	children: React.ReactNode;
	title?: string;
};

const ModalLayout = ({ children, title }: Props) => {
	const theme = useThemeStyles();
	const { top } = useSafeAreaInsets();
	return (
		<ToastLayout>
			<View
				className='px-4 pb-8 flex-1'
				style={{ paddingTop: Platform.OS === 'android' ? top + 20 : 0 }}
			>
				<View className='p-4'>
					<View className='items-end'>
						<CloseButton onTouchEnd={router.back} />
					</View>
					{title && (
						<View>
							<Typography variant='h3' color={theme['--primary']}>
								{title}
							</Typography>
						</View>
					)}
				</View>
				{children}
			</View>
		</ToastLayout>
	);
};

export default ModalLayout;

const styles = StyleSheet.create({});
