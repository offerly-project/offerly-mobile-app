import Button from '@/components/Button/Buttton';
import Input from '@/components/Input/Input';
import Typography from '@/components/Typography/Typography';
import { createCustomError } from '@/entities/error.entity';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { languageStore, userStore } from '@/stores';
import { translateInvalidError } from '@/utils/utils';
import parsePhoneNumber, { ParseError, parsePhoneNumberWithError } from 'libphonenumber-js';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

type Props = {
	closeHandler: () => void;
	initialPhoneNumber: string;
};

const PhoneNumberEditSheet = ({ closeHandler, initialPhoneNumber }: Props) => {
	const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const theme = useThemeStyles();
	const { translations } = languageStore();
	return (
		<View className='gap-4'>
			<Input
				sheeted
				placeholder={translations.placeholders.phoneNumber}
				value={phoneNumber}
				onChangeText={(value) => {
					const phoneNumb = parsePhoneNumber(value);
					if (phoneNumb) {
						setPhoneNumber(phoneNumb?.formatInternational());
					} else {
						setPhoneNumber(value);
					}
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
						try {
							if (phoneNumber !== '') {
								const finalPhoneNumb = parsePhoneNumberWithError(phoneNumber);
								if (!finalPhoneNumb.isValid()) {
									setError(translateInvalidError('phoneNumber', translations));
									return;
								}
							}
							setLoading(true);
							await userStore()
								.updateUser({
									phone_number: phoneNumber.split(' ').join(''),
								})
								.then(() => {
									Toast.show({
										type: 'success',
										text1: translations.toast.phoneNumberUpdated,
									});
									closeHandler();
								});
						} catch (e) {
							if (e instanceof ParseError) {
								setError(translateInvalidError('phoneNumber', translations));
								return;
							}
							setError(createCustomError(e).message);
						} finally {
							setLoading(false);
						}
					}}
				>
					<Typography color={theme['--background']}>
						{translations.tabs.account.profile.save}
					</Typography>
				</Button>
				<Button onPress={closeHandler} className='flex-1 h-[45]' borderStyle='ghost'>
					<Typography>{translations.tabs.account.profile.cancel}</Typography>
				</Button>
			</View>
		</View>
	);
};

export default PhoneNumberEditSheet;

const styles = StyleSheet.create({});
