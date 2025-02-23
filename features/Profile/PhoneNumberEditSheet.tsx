import Button from '@/components/Button/Buttton';
import Input from '@/components/Input/Input';
import CountrySelect from '@/components/Select/CountrySelect';
import Typography from '@/components/Typography/Typography';
import { createCustomError } from '@/entities/error.entity';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { languageStore, staticDataStore, userStore } from '@/stores';
import { translateInvalidError } from '@/utils/utils';
import { ParseError, parsePhoneNumberWithError } from 'libphonenumber-js';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

type Props = {
	closeHandler: () => void;
	initialPhoneNumber: string;
};

const PhoneNumberEditSheet = ({ closeHandler, initialPhoneNumber }: Props) => {
	const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber.split(' ')[1] || '');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const theme = useThemeStyles();
	const { translations } = languageStore();
	const countries = staticDataStore().countries;
	const [country, setCountry] = useState(
		phoneNumber
			? countries.find((c) => c.phone_code === initialPhoneNumber.split(' ')[0])!
			: countries[0],
	);

	return (
		<View className='gap-4'>
			<View className='flex-row gap-4 w-full'>
				<CountrySelect value={country} renderedValue='phone_code' onSelect={setCountry} />
				<View className='flex-1'>
					<Input
						sheeted
						placeholder={translations.placeholders.phoneNumber}
						value={phoneNumber}
						onChangeText={(value) => {
							setPhoneNumber(value);
							setError('');
						}}
					/>
				</View>
			</View>
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
						try {
							const fullPhoneNumber = [country.phone_code, phoneNumber].join(' ');

							if (phoneNumber !== '') {
								const finalPhoneNumb = parsePhoneNumberWithError(fullPhoneNumber);
								if (!finalPhoneNumb.isValid()) {
									setError(translateInvalidError('phoneNumber', translations));
									return;
								}
							}

							setLoading(true);
							await userStore()
								.updateUser({
									phone_number:
										phoneNumber.length === 0
											? ''
											: [
													country.phone_code,
													phoneNumber.split(' ').join(''),
												].join(' '),
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
			</View>
		</View>
	);
};

export default PhoneNumberEditSheet;

const styles = StyleSheet.create({});
