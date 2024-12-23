import { ActivityIndicator, View, TouchableOpacity } from 'react-native';
import Typography from '@/components/Typography/Typography';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import OTPInput from '@/components/Input/OtpInput';
import Button from '@/components/Button/Buttton';
import { useState, useEffect } from 'react';
import { userStore } from '@/stores';
import KeyboardAvoidingLayout from '@/layouts/KeyboardAvoidingLayout';
import { AxiosError } from 'axios';

interface OtpFormProps {
	timer: number;
	email: string;
}

export default function OtpForm({ timer, email }: OtpFormProps) {
	const theme = useThemeStyles();
	const [canSubmit, setCanSubmit] = useState(false);
	const [loading, setLoading] = useState(false);
	const [timeLeft, setTimeLeft] = useState(timer);
	const [otpCode, setOtpCode] = useState('');
	const [serverError, setServerError] = useState('');

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
		} catch (err) {
			if (err instanceof AxiosError) setServerError(err.response?.data.message);
		}
	};

	const handleResend = async () => {
		setLoading(true);
		const res = await userStore().forgetPassword(email);
		if (res) {
			setTimeLeft(res.timer / 1000);
			setLoading(false);
		}
	};

	useEffect(() => {
		if (timeLeft > 0) {
			const interval = setInterval(() => {
				setTimeLeft((prev) => prev - 1);
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [timeLeft]);

	return (
		<KeyboardAvoidingLayout className='gap-10 flex-1 justify-center'>
			<Typography variant='h3' align='center' weight='light' color={theme['--primary-2']}>
				Enter OTP Code
			</Typography>
			<OTPInput onCodeChange={(code) => handleOTPChange(code)} />
			<View className='gap-3'>
				<Button
					disabled={!canSubmit}
					// loading={loading}
					borderStyle='filled'
					loadingComponent={<ActivityIndicator color={theme['--background']} />}
					onPress={handleSubmit}
				>
					<Typography color='white'>Send</Typography>
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
				<Typography weight='medium'> the OTP in {timeLeft}s</Typography>
			</View>
		</KeyboardAvoidingLayout>
	);
}
