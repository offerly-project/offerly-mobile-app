import Button from '@/components/Button/Buttton';
import OTPInput from '@/components/Input/OtpInput';
import Typography from '@/components/Typography/Typography';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import KeyboardAvoidingLayout from '@/layouts/KeyboardAvoidingLayout';
import { languageStore, userStore } from '@/stores';
import { ErrorCodes } from '@/ts/errors.types';
import { extractApiError } from '@/utils/utils';
import { isAxiosError } from 'axios';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, TouchableOpacity, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
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
	const [showTimer, setShowTimer] = useState(true);
	const fadeAnim = useRef(new Animated.Value(1)).current; // Animation value for fading

	const toast = useToast();

	const formatTime = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	};

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
				setResetPasswordTempToken(res);
				setShowNewPasswordView(true);
			}
		} catch (err) {
			if (isAxiosError(err)) {
				const apiError = extractApiError(err);
				if (apiError.code === ErrorCodes.INVALID_OTP) {
					toast.show(translations.errors.invalidOtp, { type: 'error' });
				}
			} else {
				toast.show(translations.errors.error, { type: 'error' });
			}
		} finally {
			setLoading(false);
		}
	};

	const handleResend = async () => {
		setLoading(true);
		const res = await userStore().forgetPassword(email);
		if (res) {
			setTimeLeft(30);
			setShowTimer(true); // Reset the timer visibility
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true,
			}).start();
			setLoading(false);
		}
	};

	useEffect(() => {
		if (timeLeft > 0) {
			const interval = setInterval(() => {
				setTimeLeft((prev) => prev - 1);
			}, 1000);

			return () => clearInterval(interval);
		} else {
			// Fade-out animation and unmount the timer
			Animated.timing(fadeAnim, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true,
			}).start(() => setShowTimer(false));
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
				{showTimer ? (
					<Animated.View style={{ opacity: fadeAnim }}>
						<Typography weight='medium' align='center'>
							{`${translations.auth.otp.in} ${formatTime(timeLeft)}`}
						</Typography>
					</Animated.View>
				) : (
					<TouchableOpacity onPress={handleResend}>
						<Typography className='underline' color={theme['--secondary']}>
							{translations.auth.otp.resend}
						</Typography>
					</TouchableOpacity>
				)}
			</View>
		</KeyboardAvoidingLayout>
	);
}
