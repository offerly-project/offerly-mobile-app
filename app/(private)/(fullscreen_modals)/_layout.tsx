import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

type Props = {};

const FullscreenModalsLayout = (props: Props) => {
	const bgColor = 'rgba(0,0,0,0.2)';
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				presentation: 'transparentModal',
				animation: 'fade',
				contentStyle: {
					backgroundColor: bgColor,
				},
			}}
		>
			<Stack.Screen name='loading_modal' />
		</Stack>
	);
};

export default FullscreenModalsLayout;

const styles = StyleSheet.create({});
