import OtpForm from '@/features/Auth/OtpForm';
import AuthLayout from '@/layouts/AuthLayout';
import { SafeAreaView } from 'react-native-safe-area-context';

const OTPScreen = () => {
	return (
		<AuthLayout>
			<OtpForm />
		</AuthLayout>
	);
};

export default OTPScreen;
