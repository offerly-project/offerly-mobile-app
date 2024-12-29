import Button from '@/components/Button/Buttton';
import Input from '@/components/Input/Input';
import Typography from '@/components/Typography/Typography';
import { useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';

type Props = {
	onConfirm: () => void;
	onCancel: () => void;
};

const PROMPT_TEXT = 'DELETE';

const DeleteAccount = ({ onCancel, onConfirm }: Props) => {
	const [input, setInput] = useState('');
	const onTextChange = (value: string) => {
		setInput(value);
		if (value === PROMPT_TEXT) {
			Keyboard.dismiss();
		}
	};
	return (
		<View>
			<Typography variant='body'>
				Please type{' '}
				<Typography color='red' weight='bold' variant='body'>
					{PROMPT_TEXT}
				</Typography>{' '}
				in the box below to confirm. Kindly note that this action is irreversible.
			</Typography>
			<Input
				placeholder={PROMPT_TEXT}
				value={input}
				onChangeText={onTextChange}
				borderStyle='outlined'
				sheeted
			/>
			<View className='flex-row gap-4 w-full py-6'>
				<Button onPress={onConfirm} disabled={input !== PROMPT_TEXT} className='flex-1'>
					<Typography>Confirm</Typography>
				</Button>
				<Button onPress={onCancel} className='flex-1' borderStyle='ghost'>
					<Typography>Cancel</Typography>
				</Button>
			</View>
		</View>
	);
};

export default DeleteAccount;

const styles = StyleSheet.create({});
