import CloseButton from '@/components/Button/CloseButton';
import Typography from '@/components/Typography/Typography';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

type Props = {
	children: React.ReactNode;
	title?: string;
};

const ModalLayout = ({ children, title }: Props) => {
	const theme = useThemeStyles();
	return (
		<>
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
						<Typography variant='h3' color={theme['--primary-1']}>
							{title}
						</Typography>
					</View>
				)}
			</View>
			{children}
		</>
	);
};

export default ModalLayout;

const styles = StyleSheet.create({});
