import Button from '@/components/Button/Buttton';
import Input from '@/components/Input/Input';
import Typography from '@/components/Typography/Typography';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { userStore } from '@/stores';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

type Props = {
	closeHandler: () => void;
	initialFullName: string;
};

const FullNameEditSheet = ({ closeHandler, initialFullName }: Props) => {
	const [fullName, setFullName] = useState(initialFullName);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const theme = useThemeStyles();
	return (
		<View className='gap-4'>
			<Input
				placeholder={'Full name'}
				value={fullName}
				onChangeText={(value) => {
					setFullName(value);
					setError('');
				}}
			/>
			{error && <Typography color='red'>{error}</Typography>}
			<View className='flex-row gap-4 w-full'>
				<Button
					loading={loading}
					loadingComponent={<ActivityIndicator color={theme['--background']} />}
					className='flex-1 h-[45]'
					borderStyle='filled'
					onPress={async () => {
						if (fullName.length === 0) {
							setError('Full name cannot be empty');
							return;
						}
						try {
							setLoading(true);
							await userStore().updateUser({ full_name: fullName });
							closeHandler();
						} catch (e) {
							setError('An error occurred');
						} finally {
							setLoading(false);
						}
					}}
				>
					<Typography color={theme['--background']}>Save</Typography>
				</Button>
				<Button onPress={closeHandler} className='flex-1 h-[45]' borderStyle='ghost'>
					<Typography>Cancel</Typography>
				</Button>
			</View>
		</View>
	);
};

export default FullNameEditSheet;

const styles = StyleSheet.create({});
