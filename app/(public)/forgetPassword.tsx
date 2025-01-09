import ForgetPassword from '@/features/Auth/ForgetPassword';
import AuthLayout from '@/layouts/AuthLayout';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function forgetPassword() {
	return (
		<AuthLayout>
			<ForgetPassword />
		</AuthLayout>
	);
}
