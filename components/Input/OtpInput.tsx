import { languageStore } from '@/stores';
import React, { useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import OutsidePressHandler from 'react-native-outside-press';

interface OTPInputProps {
	onCodeChange?: (code: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ onCodeChange }) => {
	const [otp, setOtp] = useState<string[]>(['', '', '', '']);
	const inputsRef = useRef<Array<TextInput | null>>([]);
	const { isRtl } = languageStore();

	const handleChange = (text: string, index: number) => {
		const newOtp = [...otp];

		// Ensure only one digit is stored
		if (text.length > 1) {
			text = text.slice(-1);
		}

		newOtp[index] = text;
		setOtp(newOtp);
		onCodeChange?.(newOtp.join(''));

		// Move to the next input if a digit is entered
		if (text && index < otp.length - 1) {
			inputsRef.current[index + 1]?.focus();
		}
	};

	const handleKeyPress = (key: string, index: number) => {
		if (key === 'Backspace') {
			const newOtp = [...otp];

			if (otp[index]) {
				// Clear current field first
				newOtp[index] = '';
			} else if (index > 0) {
				// Move to the previous field and clear it
				newOtp[index - 1] = '';
				inputsRef.current[index - 1]?.focus();
			}

			setOtp(newOtp);
			onCodeChange?.(newOtp.join(''));
		}
	};

	const [focusedIndex, setFocusedIndex] = useState<number>(-1);

	const handleFocus = (index: number) => {
		// Find the last filled index
		const lastFilledIndex = otp.findLastIndex((value) => value !== '');
		// Find the first empty field
		const firstEmptyIndex = otp.findIndex((value) => value === '');

		let targetIndex;

		if (lastFilledIndex === otp.length - 1) {
			// If all fields are filled, focus on the last field
			targetIndex = otp.length - 1;
		} else if (firstEmptyIndex !== -1) {
			// If some fields are filled, focus on the first empty field
			targetIndex = firstEmptyIndex;
		} else {
			// If none are filled, focus on the first field
			targetIndex = 0;
		}

		setFocusedIndex(targetIndex);

		inputsRef.current[targetIndex]?.focus();
	};

	return (
		<OutsidePressHandler
			onOutsidePress={() => {
				if (focusedIndex === -1) return;
				inputsRef.current[focusedIndex]?.blur();
				setFocusedIndex(-1);
			}}
		>
			<View
				className={`flex-row justify-between w-full max-w-xs mx-auto ${isRtl ? 'flex-row-reverse' : ''}`}
			>
				{otp.map((value, index) => (
					<TextInput
						key={index}
						className={`border-2 w-[60px] h-[70px] text-3xl text-center rounded-lg text-text font-light ${
							focusedIndex === index ? 'border-selected' : 'border-light-background'
						}`}
						value={value}
						selectionColor={'transparent'}
						onChangeText={(text) => handleChange(text, index)}
						onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(key, index)}
						keyboardType='number-pad'
						maxLength={1}
						ref={(ref) => (inputsRef.current[index] = ref)}
						autoFocus={index === 0}
						onFocus={() => handleFocus(index)}
					/>
				))}
			</View>
		</OutsidePressHandler>
	);
};

export default OTPInput;
