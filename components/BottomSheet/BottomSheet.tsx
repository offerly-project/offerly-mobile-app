import { useThemeStyles } from '@/hooks/useThemeStyles';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { ComponentProps, useEffect, useRef } from 'react';
import { Keyboard, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
type Props = {
	open?: boolean;
	children: (closeHandler: () => void) => React.ReactNode;
} & Omit<ComponentProps<typeof BottomSheetModal>, 'children'>;

type BackdropProps = {
	onPress: () => void;
};

const Backdrop = ({ onPress }: BackdropProps) => {
	return (
		<Pressable
			className='bg-[rgba(0,0,0,0.2)] absolute top-0 left-0 right-0 bottom-0'
			onPress={onPress}
		/>
	);
};

const BottomSheet = ({ open, children, ...rest }: Props) => {
	const ref = useRef<BottomSheetModal>(null);
	useEffect(() => {
		if (open) {
			Keyboard.dismiss();
			ref.current?.present();
		} else {
			ref.current?.dismiss();
		}
	}, [open]);
	const insets = useSafeAreaInsets();

	const theme = useThemeStyles();

	return (
		open && (
			<BottomSheetModal
				backdropComponent={(props) => (
					<Backdrop
						onPress={() => {
							Keyboard.dismiss();
							ref.current?.dismiss();
						}}
						{...props}
					/>
				)}
				ref={ref}
				keyboardBehavior='interactive'
				keyboardBlurBehavior='restore'
				enableDynamicSizing
				containerStyle={{
					zIndex: 10,
					marginLeft: insets.left,
					marginRight: insets.right,
				}}
				enableOverDrag={false}
				enablePanDownToClose
				topInset={insets.top}
				backgroundComponent={({ style }) => (
					<View
						style={[
							{
								backgroundColor: theme['--light-background'],
								borderTopLeftRadius: 50,
								borderTopRightRadius: 50,
							},
							style,
						]}
					/>
				)}
				handleStyle={{
					backgroundColor: theme['--light-background'],
					borderTopLeftRadius: 50,
					borderTopRightRadius: 50,
				}}
				handleIndicatorStyle={{ backgroundColor: theme['--primary'] }}
				{...rest}
			>
				<BottomSheetView
					className={`px-6`}
					style={{
						paddingBottom: insets.bottom,
						backgroundColor: theme['--light-background'],
					}}
				>
					{children(() => ref.current?.close())}
				</BottomSheetView>
			</BottomSheetModal>
		)
	);
};

export default BottomSheet;
