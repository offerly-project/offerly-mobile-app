import { useThemeStyles } from '@/hooks/useThemeStyles';
import { BottomSheetBackdropProps, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { ComponentProps, useEffect, useRef } from 'react';
import { Keyboard, Pressable, View } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
type Props = {
	open?: boolean;
	children: (closeHandler: () => void) => React.ReactNode;
} & Omit<ComponentProps<typeof BottomSheetModal>, 'children'>;

type BackdropProps = {
	onPress: () => void;
} & BottomSheetBackdropProps;

const Backdrop = ({ onPress, animatedIndex }: BackdropProps) => {
	const animatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(animatedIndex.value, [-1, 1], [0, 0.8], Extrapolation.CLAMP),
	}));
	return (
		<Animated.View
			className={'flex-1 absolute top-0 left-0 right-0 bottom-0'}
			style={[animatedStyle, { backgroundColor: 'black' }]}
		>
			<Pressable className='flex-1' onPress={onPress} />
		</Animated.View>
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
				stackBehavior='switch'
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
								backgroundColor: theme['--bottomsheet-bg'],
								borderTopLeftRadius: 50,
								borderTopRightRadius: 50,
							},
							style,
						]}
					/>
				)}
				handleStyle={{
					backgroundColor: theme['--bottomsheet-bg'],
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
						backgroundColor: theme['--bottomsheet-bg'],
					}}
				>
					{children(() => ref.current?.close())}
				</BottomSheetView>
			</BottomSheetModal>
		)
	);
};

export default BottomSheet;
