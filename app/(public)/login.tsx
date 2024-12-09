import LoginForm from '@/features/Login/LoginForm';
import { SafeAreaView } from 'react-native-safe-area-context';

export const LoginScreen = () => {
	return (
		<SafeAreaView className='px-10 flex-1 w-full h-full justify-center bg-white'>
			<LoginForm />
		</SafeAreaView>
	);
};

export default LoginScreen;
