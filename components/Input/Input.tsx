import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import React, { useEffect } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import Typography from '../Typography/Typography';

const COLORING = {
	primary: 'border-primary-1',
	secondary: 'border-secondary-1',
};

const BORDER_STYLE = {
	outlined: 'border-2 rounded-lg px-2 py-3',
	underlined: 'border-b-2 px-1 py-2',
};

type Variants = 'primary' | 'secondary';

type BorderVariants = 'outlined' | 'underlined';

interface InputProps extends Omit<TextInputProps, 'onChange'> {
	type?: 'text' | 'password' | 'number';
	variant?: Variants;
	borderStyle?: BorderVariants;
	placeholder?: string;
	value?: string;
	disabled?: boolean;
	leadingIcon?: () => React.ReactNode;
	trailingIcon?: () => React.ReactNode;
	sheeted?: boolean;
	error?: string;
	focused?: boolean;
}

const Input: React.FC<InputProps> = ({
	type = 'text',
	variant: color = 'primary',
	borderStyle = 'outlined',
	placeholder = '',
	value,
	onChangeText,
	disabled = false,
	leadingIcon,
	trailingIcon,
	sheeted,
	error,
	focused,
	...rest
}) => {
	const inputStyles = `flex-1 text-black mx-3`;
	const containerStyles = `bg-transparent flex-row items-center ${BORDER_STYLE[borderStyle]} ${COLORING[color]} ${disabled ? 'opacity-40' : ''}`;

	const ref = React.useRef<TextInput>(null);
	useEffect(() => {
		if (focused) {
			ref.current?.focus();
		} else {
			ref.current?.blur();
		}
	}, [focused]);

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

	const Comp = sheeted ? BottomSheetTextInput : TextInput;

	return (
		<>
			<View className={containerStyles}>
				{leadingIcon && leadingIcon()}
				<Comp
					ref={ref as any}
					placeholder={placeholder}
					placeholderTextColor='lightgray'
					value={value}
					onChangeText={onChangeText}
					editable={!disabled}
					keyboardType={getKeyboardType()}
					{...rest}
					className={[inputStyles, rest.className].join(' ')}
				/>
				{trailingIcon && trailingIcon()}
			</View>
			{error && (
				<Typography color='red' variant='caption'>
					{error}
				</Typography>
			)}
		</>
	);
};

export default Input;
