import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
	TextInput,
	TextInputProps,
	View,
	GestureResponderEvent,
	TouchableOpacity,
} from 'react-native';

const COLORING = {
	primary: 'border-primary',
	secondary: 'border-secondary',
	success: 'border-success',
	danger: 'border-danger',
};

const BORDER_STYLE = {
	outlined: 'border-2 rounded-lg px-2 py-3',
	underlined: 'border-b-2 px-1 py-2',
};

interface InputProps extends Omit<TextInputProps, 'onChange'> {
	type?: 'text' | 'password' | 'number';
	color?: 'primary' | 'secondary' | 'success' | 'danger';
	borderStyle?: 'outlined' | 'underlined';
	placeholder?: string;
	value?: string;
	onChangeText?: (text: string) => void;
	disabled?: boolean;
	leadingIcon?: React.ReactNode;
	trailingIcon?: React.ReactNode | 'showHidePasswordButton';
	onTrailingIconPress?: (event: GestureResponderEvent) => void;
}

const Input: React.FC<InputProps> = ({
	type = 'password',
	color = 'primary',
	borderStyle = 'underlined',
	placeholder = '',
	value,
	onChangeText,
	disabled = false,
	leadingIcon,
	trailingIcon,
	onTrailingIconPress,
}) => {
	const [isPasswordHidden, setPasswordHidden] = useState(type === 'password');
	const inputStyles = `flex-1 text-black mx-3`;
	const containerStyles = `flex-row items-center ${BORDER_STYLE[borderStyle]} ${COLORING[color]} ${disabled && 'opacity-40'}`;

	const getKeyboardType = () => {
		switch (type) {
			case 'number':
				return 'numeric';
			case 'password':
				return 'default';
			default:
				return 'default';
		}
	};

	const handleTrailingIconPress = (event: GestureResponderEvent) => {
		if (type === 'password') {
			setPasswordHidden(!isPasswordHidden);
		}
		if (onTrailingIconPress) {
			onTrailingIconPress(event); // Call the user's custom press handler if provided
		}
	};

	return (
		<View className={containerStyles}>
			{leadingIcon && leadingIcon}
			<TextInput
				className={inputStyles}
				placeholder={placeholder}
				placeholderTextColor='lightgray'
				value={value}
				onChangeText={onChangeText}
				editable={!disabled}
				secureTextEntry={isPasswordHidden}
				keyboardType={getKeyboardType()}
			/>
			{trailingIcon != 'showHidePasswordButton' ? (
				<TouchableOpacity onPress={handleTrailingIconPress} disabled={!onTrailingIconPress}>
					{trailingIcon}
				</TouchableOpacity>
			) : (
				<TouchableOpacity>
					<Feather onPress={handleTrailingIconPress} name='eye' size={20} color='gray' />
				</TouchableOpacity>
			)}
		</View>
	);
};

export default Input;
