import Button from '@/components/Button/Buttton';
import Input from '@/components/Input/Input';
import Typography from '@/components/Typography/Typography';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { languageStore, userStore } from '@/stores';
import { translateRequiredError } from '@/utils/utils';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

type Props = {
	closeHandler: () => void;
	initialFullName: string;
};

const FullNameEditSheet = ({ closeHandler, initialFullName }: Props) => {
	const [fullName, setFullName] = useState(initialFullName);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const theme = useThemeStyles();
	const { translations } = languageStore();
	return (
		<View className='gap-4'>
			<Input
				sheeted
				placeholder={translations.placeholders.fullName}
				value={fullName}
				onChangeText={(value) => {
					setFullName(value);
					setError('');
				}}
			/>
			{error && <Typography color='red'>{error}</Typography>}
			<View className='flex-row gap-4 w-full'>
				<Button onPress={closeHandler} className='flex-1 h-[45]' borderStyle='ghost'>
					<Typography>{translations.tabs.account.profile.cancel}</Typography>
				</Button>
				<Button
					loading={loading}
					loadingComponent={<ActivityIndicator color={theme['--background']} />}
					className='flex-1 h-[45]'
					borderStyle='filled'
					onPress={async () => {
						if (fullName.length === 0) {
							setError(translateRequiredError('fullName', translations));
							return;
						}
						try {
							setLoading(true);
							await userStore().updateUser({ full_name: fullName });
							Toast.show({
								type: 'success',
								text1: translations.toast.nameUpdated,
							});
							closeHandler();
						} catch (e) {
							setError(translations.errors.error);
						} finally {
							setLoading(false);
						}
					}}
				>
					<Typography color={theme['--background']}>
						{translations.tabs.account.profile.save}
					</Typography>
				</Button>
			</View>
		</View>
	);
};

export default FullNameEditSheet;

const styles = StyleSheet.create({});
