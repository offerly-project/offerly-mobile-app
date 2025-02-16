import Button from '@/components/Button/Buttton';
import Input from '@/components/Input/Input';
import Typography from '@/components/Typography/Typography';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { languageStore } from '@/stores';
import { useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';

type Props = {
	onConfirm: () => void;
	onCancel: () => void;
};

const DeleteAccount = ({ onCancel, onConfirm }: Props) => {
	const [input, setInput] = useState('');
	const { translations } = languageStore();
	const deletePrompt = translations.tabs.account.deleteAccount.deleteAccountPrompt;
	const theme = useThemeStyles();
	const onTextChange = (value: string) => {
		setInput(value);
		if (value === deletePrompt) {
			Keyboard.dismiss();
		}
	};
	return (
		<View>
			<Typography variant='body'>
				{translations.tabs.account.deleteAccount.warningMessage.segment1}{' '}
				<Typography color='red' weight='bold' variant='body'>
					{deletePrompt}
				</Typography>{' '}
				{translations.tabs.account.deleteAccount.warningMessage.segment2}
			</Typography>
			<Input
				placeholder={deletePrompt}
				value={input}
				onChangeText={onTextChange}
				borderStyle='outlined'
				sheeted
				autoCapitalize='characters'
			/>
			<View className='flex-row gap-4 w-full py-6'>
				<Button onPress={onCancel} className='flex-1' borderStyle='ghost'>
					<Typography>{translations.buttons.cancel}</Typography>
				</Button>
				<Button
					onPress={onConfirm}
					borderStyle='filled'
					variant='primary'
					disabled={input !== deletePrompt}
					className='flex-1'
				>
					<Typography color={theme['--background']} weight='bold'>
						{translations.buttons.confirm}
					</Typography>
				</Button>
			</View>
		</View>
	);
};

export default DeleteAccount;

const styles = StyleSheet.create({});
