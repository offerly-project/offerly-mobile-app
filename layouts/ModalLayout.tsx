import CloseButton from '@/components/Button/CloseButton';
import Typography from '@/components/Typography/Typography';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { router } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-toast-notifications';
import { TAB_LAYOUT_HEADER_HEIGHT } from './TabLayout';

type Props = {
	children: React.ReactNode;
	title?: string;
};

const ModalLayout = ({ children, title }: Props) => {
	const theme = useThemeStyles();
	const { top } = useSafeAreaInsets();
	return (
		<ToastProvider placement='top' offsetTop={TAB_LAYOUT_HEADER_HEIGHT}>
			<View
				className='px-4 pb-8 flex-1'
				style={{ paddingTop: Platform.OS === 'android' ? top + 20 : 0 }}
			>
				<View className='p-4'>
					<View className='items-end'>
						<CloseButton
							onPress={() => {
								router.back();
							}}
						/>
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
		</ToastProvider>
	);
};

export default ModalLayout;

const styles = StyleSheet.create({});
