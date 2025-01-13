import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStyles } from '@/hooks/useThemeStyles';

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
			<Text className='ml-2' style={{ color: theme['--text'] }}>
				{label}
			</Text>
		</TouchableOpacity>
	);
};

export default RadioButton;
