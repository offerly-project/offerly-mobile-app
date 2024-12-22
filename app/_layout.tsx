import { getBaseScreenLayout } from '@/constants/screens';
import { ThemeContextProvider } from '@/contexts/ThemeContext';
import { staticDataStore, userStore } from '@/stores';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StatusBar, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css';

SplashScreen.preventAutoHideAsync();

//@ts-ignore
Text.defaultProps = {
	allowFontScaling: false,
};

//@ts-ignore
ScrollView.defaultProps = {
	showsVerticalScrollIndicator: false,
	showsHorizontalScrollIndicator: false,
};

export default function RootLayout() {
	const [loaded, error] = useFonts({
		'Roboto-Regular': require('@/assets/fonts/Roboto-Regular.ttf'),
		'Roboto-Medium': require('@/assets/fonts/Roboto-Medium.ttf'),
		'Roboto-Bold': require('@/assets/fonts/Roboto-Bold.ttf'),
		'Roboto-Light': require('@/assets/fonts/Roboto-Light.ttf'),
	});

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (loaded) {
			staticDataStore()
				.fetchStaticData()
				.then(() => {
					SplashScreen.hideAsync();
					userStore().login('jadhamwi4@gmail.com', '1234');
					setLoading(false);
				});
		}
		if (error) {
			throw new Error('Failed to load fonts');
		}
	}, [loaded, error]);

	if (loading) return null;

	return (
		<ThemeContextProvider>
			{(theme) => (
				<GestureHandlerRootView style={{ flex: 1 }}>
					<StatusBar barStyle={'light-content'} />
					<BottomSheetModalProvider>
						<Stack screenOptions={{ ...getBaseScreenLayout(theme) }}>
							<Stack.Screen
								name='(public)'
								options={{
									animation: 'none',
								}}
							/>
							<Stack.Screen
								name='(private)'
								options={{
									animation: 'none',
								}}
							/>
							<Stack.Screen
								name='(modals)'
								options={{
									presentation: 'modal',
								}}
							/>
						</Stack>
					</BottomSheetModalProvider>
				</GestureHandlerRootView>
			)}
		</ThemeContextProvider>
	);
}
