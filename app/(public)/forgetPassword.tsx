import ForgetPassword from '@/features/Login/ForgetPassword';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function forgetPassword() {
	return (
		<SafeAreaView className='px-10 flex-1 w-full h-full justify-center bg-white'>
			<ForgetPassword />
		</SafeAreaView>
	);
}
