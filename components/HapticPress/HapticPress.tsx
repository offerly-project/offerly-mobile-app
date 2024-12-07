import * as Haptics from 'expo-haptics';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet } from 'react-native';

type Props = ComponentProps<typeof Pressable>;

const HapticPress = (props: Props) => {
	return (
		<Pressable
			{...props}
			onPress={(e) => {
				if (props.disabled) return;
				Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
				if (props.onPress) props.onPress(e);
			}}
		/>
	);
};

export default HapticPress;

const styles = StyleSheet.create({});
