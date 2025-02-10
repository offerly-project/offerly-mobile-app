import ErrorBoundary from '@/components/ErrorBoundary';
import { getBaseScreenLayout } from '@/constants/screens';
import { ThemeContextProvider } from '@/contexts/ThemeContext';
import { useNetworkObserver } from '@/hooks/useNetworkObserver';
import ToastLayout from '@/layouts/ToastLayout';
import Welcome from '@/lottie/Welcome';
import { languageStore, staticDataStore, themeStore, uiStore, userStore } from '@/stores';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { FlatList, ScrollView, StatusBar, Text, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { EventProvider } from 'react-native-outside-press';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import '../global.css';

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ fade: true });

// Prevent font scaling globally
//@ts-ignore
Text.defaultProps = { allowFontScaling: false };
// Disable scroll indicators globally
//@ts-ignore
ScrollView.defaultProps = {
	showsVerticalScrollIndicator: false,
	showsHorizontalScrollIndicator: false,
	keyboardShouldPersistTaps: 'always',
};
//@ts-ignore
FlatList.defaultProps = {
	showsVerticalScrollIndicator: false,
	showsHorizontalScrollIndicator: false,
	keyboardShouldPersistTaps: 'always',
};

TouchableOpacity.defaultProps = {
	activeOpacity: 0.8,
};

export const RootLayout = observer(() => {
	useNetworkObserver();
	const [loading, setLoading] = useState(true);
	const [animationFinished, setAnimationFinished] = useState(false);

	// Fade-in animation
	const opacity = useSharedValue(0);

	const [loaded, error] = useFonts({
		'Tajawal-Regular': require('@/assets/fonts/Tajawal-Regular.ttf'),
		'Tajawal-Medium': require('@/assets/fonts/Tajawal-Medium.ttf'),
		'Tajawal-Bold': require('@/assets/fonts/Tajawal-Bold.ttf'),
		'Tajawal-Light': require('@/assets/fonts/Tajawal-Light.ttf'),
	});

	useEffect(() => {
		const loadApp = async () => {
			if (loaded) {
				await SplashScreen.hideAsync();
				await staticDataStore().fetchStaticData();
				await Promise.all([languageStore().setup(), themeStore().setup()]);
				await uiStore().setup();
				await userStore().setup();
				setLoading(false);
			}
			if (error) throw new Error('Failed to load fonts');
		};
		loadApp();
	}, [loaded, error]);

	// Trigger fade-in animation when welcome screen finishes
	useEffect(() => {
		if (animationFinished) {
			opacity.value = withTiming(1, { duration: 500 });
		}
	}, [animationFinished]);

	// Animated style
	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
		animationDuration: '0.5s',
	}));

	// Show welcome animation if app is still loading
	if (loading || !animationFinished)
		return <Welcome onFinish={() => setAnimationFinished(true)} />;

	return (
		<ErrorBoundary>
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
									<Animated.View style={[{ flex: 1 }, animatedStyle]}>
										<Stack screenOptions={getBaseScreenLayout(theme)}>
											<Stack.Screen
												name='(public)'
												options={{ animation: 'none' }}
											/>
											<Stack.Screen
												name='(private)'
												options={{ animation: 'none' }}
											/>
										</Stack>
									</Animated.View>
								</BottomSheetModalProvider>
							</GestureHandlerRootView>
						</ToastLayout>
					)}
				</ThemeContextProvider>
			</EventProvider>
		</ErrorBoundary>
	);
});

export default RootLayout;
