import { default as BS, BottomSheetView } from '@gorhom/bottom-sheet';
import { ComponentProps, useEffect, useRef } from 'react';
import { Keyboard, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
type Props = {
	open?: boolean;
	children: React.ReactNode;
} & ComponentProps<typeof BS>;

type BackdropProps = {
	onPress: () => void;
};

const Backdrop = ({ onPress }: BackdropProps) => {
	return (
		<Pressable
			className='bg-[rgba(0,0,0,0.5)] absolute top-0 left-0 right-0 bottom-0'
			onPress={onPress}
		/>
	);
};

const BottomSheet = ({ open, children, ...rest }: Props) => {
	useEffect(() => {
		if (open) {
			Keyboard.dismiss();
		}
	}, [open]);
	const ref = useRef<BS>(null);
	const { bottom: bottomInsets } = useSafeAreaInsets();

	return (
		open && (
			<BS
				backdropComponent={(props) => (
					<Backdrop onPress={() => ref.current?.close()} {...props} />
				)}
				ref={ref}
				keyboardBehavior='interactive'
				keyboardBlurBehavior='restore'
				containerStyle={{ zIndex: 10 }}
				{...rest}
			>
				<BottomSheetView
					className={`px-6`}
					style={{
						paddingBottom: bottomInsets,
					}}
				>
					{children}
				</BottomSheetView>
			</BS>
		)
	);
};

export default BottomSheet;
