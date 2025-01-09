import SignupForm from '@/features/Auth/SignupForm';
import AuthLayout from '@/layouts/AuthLayout';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignupScreen() {
	return (
		<AuthLayout>
			<SignupForm />
		</AuthLayout>
	);
}
