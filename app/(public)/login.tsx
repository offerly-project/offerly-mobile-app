import BottomSheet from '@/components/BottomSheet/BottomSheet';
import Button from '@/components/Button/Buttton';
import PasswordInput from '@/components/Input/PasswordInput';
import Typography from '@/components/Typography/Typography';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export const LoginScreen = () => {
	const [open, setOpen] = useState(false);
	return (
		<SafeAreaView className='px-10 flex-1 w-full h-full flex-col align-middle justify-center'>
			<Typography>Playground</Typography>
			<Button onPress={() => setOpen(true)}>
				<Typography variant='h1'>Open Sheet</Typography>
			</Button>
			<BottomSheet open={open} onClose={() => setOpen(false)}>
				<PasswordInput variant='primary' sheeted />
			</BottomSheet>
		</SafeAreaView>
	);
};

export default LoginScreen;
