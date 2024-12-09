import SignupForm from '@/features/Login/SignupForm';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignupScreen() {
	return (
		<SafeAreaView className='px-10 flex-1 w-full h-full justify-center bg-white'>
			<SignupForm />
		</SafeAreaView>
	);
}
