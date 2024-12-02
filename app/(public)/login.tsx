import Select from '@/components/Select/Select';
import Typography from '@/components/Typography/Typography';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export const LoginScreen = () => {
	const [value, setValue] = useState('1');
	return (
		<SafeAreaView className='px-10 flex-1 w-full h-full flex-col align-middle justify-center'>
			<Typography>Playground</Typography>
			<Select
				value={value}
				onChange={(v) => setValue(v)}
				items={[
					{ name: 'Bank 1', value: '1', extra: '1' },
					{ name: 'Bank 2', value: '2', extra: '2' },
					{ name: 'Bank 3', value: '3', extra: '3' },
					{ name: 'Bank 4', value: '4', extra: '4' },
					{ name: 'Bank 5', value: '5', extra: '5' },
					{ name: 'Bank 6', value: '6', extra: '6' },
					{ name: 'Bank 7', value: '7', extra: '7' },
					{ name: 'Bank 8', value: '8', extra: '8' },
					{ name: 'Bank 9', value: '9', extra: '9' },
					{ name: 'Bank 10', value: '10', extra: '10' },
				]}
				placeHolder='Select Bank...'
			/>
		</SafeAreaView>
	);
};

export default LoginScreen;
