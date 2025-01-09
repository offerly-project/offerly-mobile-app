import { getBaseScreenLayout } from '@/constants/screens';
import { ThemeContextProvider } from '@/contexts/ThemeContext';
import { useNetworkObserver } from '@/hooks/useNetworkObserver';
import { TAB_LAYOUT_HEADER_HEIGHT } from '@/layouts/TabLayout';
import { languageStore, staticDataStore, themeStore, uiStore, userStore } from '@/stores';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { ScrollView, StatusBar, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ToastProvider } from 'react-native-toast-notifications';
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
					SplashScreen.hideAsync();

					setLoading(false);
				});
		}
		if (error) {
			throw new Error('Failed to load fonts');
		}
	}, [loaded, error]);

	if (loading) return null;
	return (
		<ToastProvider placement='top' offsetTop={TAB_LAYOUT_HEADER_HEIGHT}>
			<ThemeContextProvider>
				{(theme) => (
					<GestureHandlerRootView style={{ flex: 1 }}>
						<StatusBar barStyle={'default'} />
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
				)}
			</ThemeContextProvider>
		</ToastProvider>
	);
});

export default RootLayout;
