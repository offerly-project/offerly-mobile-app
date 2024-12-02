import { Ionicons } from '@expo/vector-icons';
import { ComponentProps, useState } from 'react';
import Input from './Input';

type Props = ComponentProps<typeof Input>;

const PasswordInput = (props: Props) => {
	const [passwordHidden, setPasswordHidden] = useState(true);
	return (
		<Input
			secureTextEntry={passwordHidden}
			type='password'
			trailingIcon={() => (
				<Ionicons
					onPress={() => {
						setPasswordHidden(!passwordHidden);
					}}
					name={passwordHidden ? 'eye' : 'eye-off'}
				/>
			)}
			{...props}
		/>
	);
};

export default PasswordInput;
