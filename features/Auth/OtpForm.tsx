import { ActivityIndicator, View, TouchableOpacity } from 'react-native';
import Typography from '@/components/Typography/Typography';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import OTPInput from '@/components/Input/OtpInput';
import Button from '@/components/Button/Buttton';
import { useState, useEffect } from 'react';
import { userStore } from '@/stores';
import KeyboardAvoidingLayout from '@/layouts/KeyboardAvoidingLayout';
import { AxiosError } from 'axios';
import NewPasswordForm from './NewPasswordForm';
import { useLocalSearchParams } from 'expo-router/build/hooks';

export default function OtpForm() {
	const theme = useThemeStyles();

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
			<Typography variant='h3' align='center' weight='light' color={theme['--primary-2']}>
				Enter OTP Code
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
					<Typography color='white'>Verify code</Typography>
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
						color={theme['--primary-1']}
					>
						Resend
					</Typography>
				</TouchableOpacity>
				<Typography weight='medium'>
					{timeLeft == 0 ? 'OTP' : `the OTP in ${timeLeft}s`}
				</Typography>
			</View>
		</KeyboardAvoidingLayout>
	);
}
