import React from 'react';
import { StyleSheet } from 'react-native';
import BottomSheet from './BottomSheet';

type Props = {
	children: (openHandler: () => void) => React.ReactNode;
	sheet: (closeHandler: () => void) => React.ReactNode;
};

const BottomSheetWrapper = ({ children, sheet }: Props) => {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<>
			{children(() => setIsOpen(true))}
			<BottomSheet
				open={isOpen}
				onDismiss={() => {
					setIsOpen(false);
				}}
			>
				{sheet}
			</BottomSheet>
		</>
	);
};

export default BottomSheetWrapper;

const styles = StyleSheet.create({});
