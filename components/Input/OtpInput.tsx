import React, { useRef, useState } from 'react';
import { TextInput, View } from 'react-native';

interface OTPInputProps {
	onCodeChange?: (code: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ onCodeChange }) => {
	const [otp, setOtp] = useState<string[]>(['', '', '', '']);
	const inputsRef = useRef<Array<TextInput | null>>([]);

	const handleChange = (text: string, index: number) => {
		const newOtp = [...otp];
		newOtp[index] = text;
		setOtp(newOtp);
		onCodeChange?.(newOtp.join(''));

		// Move to the next input if a digit is entered
		if (text && index < 3) {
			inputsRef.current[index + 1]?.focus();
		}
	};

	const handleKeyPress = (key: string, index: number) => {
		if (key === 'Backspace' && !otp[index] && index > 0) {
			inputsRef.current[index - 1]?.focus();
		}
	};

	return (
		<View className='flex-row justify-between w-full max-w-xs mx-auto'>
			{otp.map((value, index) => (
				<TextInput
					key={index}
					className='border-2 border-primary-1 w-[50px] h-[50px] text-3xl text-center rounded-full text-primary-2 font-light'
					value={value}
					onChangeText={(text) => handleChange(text, index)}
					onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(key, index)}
					keyboardType='number-pad'
					maxLength={1}
					ref={(ref) => (inputsRef.current[index] = ref)}
					autoFocus={index === 0}
				/>
			))}
		</View>
	);
};

export default OTPInput;
