import Link from '@/components/Typography/Link';
import { SafeAreaView } from 'react-native-safe-area-context';

export const LoginScreen = () => {
	return (
		<SafeAreaView className='px-10 flex-1 w-full h-full flex-col align-middle justify-center'>
			<Link to='/'>Home</Link>
		</SafeAreaView>
	);
};

export default LoginScreen;
