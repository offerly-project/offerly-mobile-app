import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import Typography from '../Typography/Typography';

type RadioButtonProps = {
	label: string;
	value: string;
	selectedValue: string;
	onPress: (value: string) => void;
};

const RadioButton: React.FC<RadioButtonProps> = ({ label, value, selectedValue, onPress }) => {
	const theme = useThemeStyles();

	return (
		<TouchableOpacity onPress={() => onPress(value)} className='flex-row items-center my-2'>
			<Ionicons
				name={selectedValue === value ? 'radio-button-on' : 'radio-button-off'}
				size={24}
				color={theme['--primary']}
			/>
			<Typography className='ml-2' color={theme['--text']}>
				{label}
			</Typography>
		</TouchableOpacity>
	);
};

export default RadioButton;
