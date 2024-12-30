import Button from '@/components/Button/Buttton';
import Input from '@/components/Input/Input';
import Typography from '@/components/Typography/Typography';
import { createCustomError } from '@/entities/error.entity';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { userStore } from '@/stores';
import parsePhoneNumber, { ParseError, parsePhoneNumberWithError } from 'libphonenumber-js';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

type Props = {
	closeHandler: () => void;
	initialPhoneNumber: string;
};

const PhoneNumberEditSheet = ({ closeHandler, initialPhoneNumber }: Props) => {
	const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const theme = useThemeStyles();
	return (
		<View className='gap-4'>
			<Input
				sheeted
				placeholder={'Phone Number'}
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
									setError('Invalid phone number');
									return;
								}
							}
							setLoading(true);
							await userStore()
								.updateUser({
									phone_number: phoneNumber.split(' ').join(''),
								})
								.then(() => {
									closeHandler();
								});
						} catch (e) {
							if (e instanceof ParseError) {
								setError('Invalid phone number');
								return;
							}
							setError(createCustomError(e).message);
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

export default PhoneNumberEditSheet;

const styles = StyleSheet.create({});
