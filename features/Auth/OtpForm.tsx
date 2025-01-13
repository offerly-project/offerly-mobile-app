import Button from '@/components/Button/Buttton';
import OTPInput from '@/components/Input/OtpInput';
import Typography from '@/components/Typography/Typography';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import KeyboardAvoidingLayout from '@/layouts/KeyboardAvoidingLayout';
import { languageStore, userStore } from '@/stores';
import { AxiosError } from 'axios';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import NewPasswordForm from './NewPasswordForm';

export default function OtpForm() {
	const theme = useThemeStyles();
	const { translations } = languageStore();

	const params = useLocalSearchParams();
	const email = params.email as string;

	const [canSubmit, setCanSubmit] = useState(false);
	const [loading, setLoading] = useState(false);
	const [otpCode, setOtpCode] = useState('');
	const [serverError, setServerError] = useState('');

	const [showNewPasswordView, setShowNewPasswordView] = useState(false);
	const [resetPasswordTempToken, setResetPasswordTempToken] = useState('');

	const [timeLeft, setTimeLeft] = useState(30);
	let interval: NodeJS.Timeout;

	const handleOTPChange = (code: string) => {
		setOtpCode(code);
		if (code.length === 4) {
			setCanSubmit(true);
		} else setCanSubmit(false);
	};

	const handleSubmit = async () => {
		setLoading(true);
		try {
			const res = await userStore().verifyOTP(otpCode, email);
			if (res) {
				clearInterval(interval);
				setResetPasswordTempToken(res);
				setShowNewPasswordView(true);
			}
		} catch (err) {
			setLoading(false);
			if (err instanceof AxiosError) setServerError(err.response?.data.message);
		}
	};

	const handleResend = async () => {
		setLoading(true);
		const res = await userStore().forgetPassword(email);
		if (res) {
			setTimeLeft(30);
			setLoading(false);
		}
	};

	useEffect(() => {
		if (timeLeft > 0) {
			interval = setInterval(() => {
				setTimeLeft((prev) => prev - 1);
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [timeLeft]);

	if (showNewPasswordView) {
		return <NewPasswordForm tempToken={resetPasswordTempToken} />;
	}

	return (
		<KeyboardAvoidingLayout className='gap-8 flex-1 justify-center'>
			<Typography variant='h3' align='center' weight='light' color={theme['--primary']}>
				{translations.auth.otp.enterCode}
			</Typography>
			<OTPInput onCodeChange={(code) => handleOTPChange(code)} />
			<View className='gap-3'>
				<Button
					disabled={!canSubmit}
					loading={loading}
					borderStyle='filled'
					loadingComponent={<ActivityIndicator color={theme['--background']} />}
					onPress={handleSubmit}
				>
					<Typography color={theme['--background']}>
						{translations.buttons.verifyCode}
					</Typography>
				</Button>
				{serverError && (
					<Typography variant='caption' color='red' align='center'>
						{serverError}
					</Typography>
				)}
			</View>
			<View className='flex-row justify-center gap-1'>
				<TouchableOpacity disabled={timeLeft != 0} onPress={handleResend}>
					<Typography
						className={`underline ${timeLeft != 0 && 'opacity-30'}`}
						color={theme['--secondary']}
					>
						{translations.auth.otp.resend}
					</Typography>
				</TouchableOpacity>
				<Typography weight='medium'>
					{timeLeft == 0
						? translations.auth.otp.otp
						: `${translations.auth.otp.otp} ${translations.auth.otp.in} ${timeLeft}s`}
				</Typography>
			</View>
		</KeyboardAvoidingLayout>
	);
}
