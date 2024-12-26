import OtpForm from '@/features/Auth/OtpForm';
import { SafeAreaView } from 'react-native-safe-area-context';

const OTPScreen = () => {
	return (
		<SafeAreaView className='px-10 flex-1 w-full h-full justify-center bg-white'>
			<OtpForm />
		</SafeAreaView>
	);
};

export default OTPScreen;
