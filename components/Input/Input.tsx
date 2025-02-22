import { useThemeStyles } from '@/hooks/useThemeStyles';
import { languageStore } from '@/stores';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import React, { useEffect } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import OutsidePressHandler from 'react-native-outside-press';
import Typography from '../Typography/Typography';

const COLORING = {
	primary: 'border-primary',
	secondary: 'border-secondary',
};

const BORDER_STYLE = {
	outlined: 'border-2 rounded-2xl px-3',
	underlined: 'border-b-2 px-0',
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
	textArea?: boolean;
}

const Input: React.FC<InputProps> = ({
	type = 'text',
	variant = 'primary',
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
	const inputStyles = `flex-1 py-3 px-2 color-text`;
	const containerStyles = `bg-transparent flex-row items-center ${BORDER_STYLE[borderStyle]} ${COLORING[variant]} ${disabled ? 'opacity-40' : ''}`;

	const ref = React.useRef<TextInput>(null);

	useEffect(() => {
		if (focused) {
			ref.current?.focus();
		} else {
			ref.current?.blur();
		}
	}, [focused]);

	const handleChangeText = (text: string) => {
		onChangeText?.(text);
	};

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
	const theme = useThemeStyles();
	const { language } = languageStore();
	return (
		<OutsidePressHandler
			onOutsidePress={() => {
				ref?.current?.blur();
			}}
		>
			<View className='gap-2'>
				<View className={containerStyles}>
					{leadingIcon && leadingIcon()}
					<Comp
						ref={ref as any}
						placeholder={placeholder}
						style={language == 'ar' ? { textAlign: 'right' } : { textAlign: 'left' }}
						placeholderTextColor='gray'
						value={value}
						onChangeText={handleChangeText}
						editable={!disabled}
						keyboardType={getKeyboardType()}
						{...rest}
						selectionColor={theme['--secondary']}
						autoCorrect={false}
						className={[inputStyles, rest.className].join(' ')}
					/>
					{trailingIcon && trailingIcon()}
				</View>
				{error && (
					<Typography align='center' color={theme['--danger']} variant='caption'>
						<MaterialCommunityIcons className='mr-2' name='information-outline' />{' '}
						{error}
					</Typography>
				)}
			</View>
		</OutsidePressHandler>
	);
};

export default Input;
