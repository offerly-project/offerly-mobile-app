import { useThemeStyles } from '@/hooks/useThemeStyles';
import { Ionicons } from '@expo/vector-icons';
import { ComponentProps, useState } from 'react';
import Input from './Input';

type Props = ComponentProps<typeof Input>;

const PasswordInput = (props: Props) => {
	const [passwordHidden, setPasswordHidden] = useState(true);
	const theme = useThemeStyles();
	return (
		<Input
			secureTextEntry={passwordHidden}
			type='password'
			trailingIcon={() => (
				<Ionicons
					onPress={() => {
						setPasswordHidden(!passwordHidden);
					}}
					size={20}
					color={theme['--primary']}
					name={passwordHidden ? 'eye' : 'eye-off'}
				/>
			)}
			{...props}
		/>
	);
};

export default PasswordInput;
