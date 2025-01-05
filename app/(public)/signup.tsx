import SignupForm from '@/features/Auth/SignupForm';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignupScreen() {
	return (
		<SafeAreaView className='px-10 flex-1 w-full h-full justify-center bg-background'>
			<SignupForm />
		</SafeAreaView>
	);
}
