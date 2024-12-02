import BottomSheet from '@/components/BottomSheet/BottomSheet';
import Button from '@/components/Button/Buttton';
import PasswordInput from '@/components/Input/PasswordInput';
import { useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const LoginScreen = () => {
	const [open, setOpen] = useState(false);
	return (
		<SafeAreaView className='px-10 flex-1 w-full h-full flex-col align-middle justify-center'>
			<Text>Playground</Text>
			<Button onPress={() => setOpen(true)}>
				<Text>Open Sheet</Text>
			</Button>
			<BottomSheet open={open} onClose={() => setOpen(false)}>
				<PasswordInput variant='primary' sheeted />
			</BottomSheet>
		</SafeAreaView>
	);
};

export default LoginScreen;
