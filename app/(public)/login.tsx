import PasswordInput from '@/components/Input/PasswordInput';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const LoginScreen = () => {
	return (
		<SafeAreaView className='px-10 flex-1 w-full h-full flex-col align-middle justify-center'>
			<Text>Playground</Text>
			<PasswordInput borderStyle='outlined' />
		</SafeAreaView>
	);
};

export default LoginScreen;
