import { DEFAULT_SCREEN_LAYOUT } from '@/constants/screens';
import { ThemeContextProvider } from '@/contexts/ThemeContext';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		'Roboto-Regular': require('@/assets/fonts/Roboto-Regular.ttf'),
		'Roboto-Medium': require('@/assets/fonts/Roboto-Medium.ttf'),
		'Roboto-Bold': require('@/assets/fonts/Roboto-Bold.ttf'),
		'Roboto-Light': require('@/assets/fonts/Roboto-Light.ttf'),
	});

	useEffect(() => {
		if (loaded) SplashScreen.hideAsync();
		if (error) {
			throw new Error('Failed to load fonts');
		}
	}, [loaded, error]);

	if (!loaded) return null;

	return (
		<ThemeContextProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<BottomSheetModalProvider>
					<Stack screenOptions={DEFAULT_SCREEN_LAYOUT}>
						<Stack.Screen name='(public)' />
						<Stack.Screen name='(private)' />
					</Stack>
				</BottomSheetModalProvider>
			</GestureHandlerRootView>
		</ThemeContextProvider>
	);
}
