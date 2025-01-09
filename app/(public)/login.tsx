import LoginForm from '@/features/Auth/LoginForm';
import AuthLayout from '@/layouts/AuthLayout';
import { SafeAreaView } from 'react-native-safe-area-context';

export const LoginScreen = () => {
	return (
		<AuthLayout>
			<LoginForm />
		</AuthLayout>
	);
};

export default LoginScreen;
