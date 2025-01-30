import { getBaseScreenLayout } from '@/constants/screens';
import { ThemeContextProvider } from '@/contexts/ThemeContext';
import { useNetworkObserver } from '@/hooks/useNetworkObserver';
import ToastLayout from '@/layouts/ToastLayout';
import { languageStore, staticDataStore, themeStore, uiStore, userStore } from '@/stores';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { ScrollView, StatusBar, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { EventProvider } from 'react-native-outside-press';
import '../global.css';

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
	fade: true,
});

//@ts-ignore
Text.defaultProps = {
	allowFontScaling: false,
};

//@ts-ignore
ScrollView.defaultProps = {
	showsVerticalScrollIndicator: false,
	showsHorizontalScrollIndicator: false,
	keyboardShouldPersistTaps: 'always',
};

export const RootLayout = observer(() => {
	const [loaded, error] = useFonts({
		'Tajawal-Regular': require('@/assets/fonts/Tajawal-Regular.ttf'),
		'Tajawal-Medium': require('@/assets/fonts/Tajawal-Medium.ttf'),
		'Tajawal-Bold': require('@/assets/fonts/Tajawal-Bold.ttf'),
		'Tajawal-Light': require('@/assets/fonts/Tajawal-Light.ttf'),
	});

	const [loading, setLoading] = useState(true);

	useNetworkObserver();
	useEffect(() => {
		if (loaded) {
			staticDataStore()
				.fetchStaticData()
				.then(async () => {
					await Promise.all([languageStore().setup(), themeStore().setup()]);
					await uiStore().setup();
					await userStore().setup();
					SplashScreen.hide();

					setLoading(false);
				});
		}
		if (error) {
			throw new Error('Failed to load fonts');
		}
	}, [loaded, error]);

	if (loading) return null;
	return (
		<EventProvider>
			<ThemeContextProvider>
				{(theme) => (
					<ToastLayout>
						<GestureHandlerRootView style={{ flex: 1 }}>
							<StatusBar
								translucent
								backgroundColor={'transparent'}
								barStyle={'light-content'}
							/>
							<BottomSheetModalProvider>
								<Stack screenOptions={getBaseScreenLayout(theme)}>
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
								</Stack>
							</BottomSheetModalProvider>
						</GestureHandlerRootView>
					</ToastLayout>
				)}
			</ThemeContextProvider>
		</EventProvider>
	);
});

export default RootLayout;
