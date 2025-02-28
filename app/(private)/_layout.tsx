import NotificationsWrapper from '@/components/NotificationsWrapper';
import { getBaseScreenLayout } from '@/constants/screens';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { cardsStore, userStore } from '@/stores';
import { authEmitter } from '@/stores/user.store';
import { Redirect, Stack } from 'expo-router';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Animated, Platform } from 'react-native';

export const PrivateLayout = observer(() => {
	const { authenticated, isGuest } = userStore();
	const theme = useThemeStyles();
	const [loading, setLoading] = useState(true);

	// Animations
	const fadeAnim = useState(new Animated.Value(0))[0]; // Loading fade-in
	const wrapperFadeAnim = useState(new Animated.Value(0))[0]; // Content fade-in & scale-up

	useEffect(() => {
		authEmitter.on('logout', () => {
			// Reverse the animations (fade out & scale down)
			Animated.timing(fadeAnim, {
				toValue: 0, // Fade out the loading animation
				duration: 300,
				useNativeDriver: true,
			}).start();

			Animated.timing(wrapperFadeAnim, {
				toValue: 0, // Fade out the content
				duration: 300,
				useNativeDriver: true,
			}).start(() => {
				userStore().applyLogout();
			});
		});

		// Start loading animation
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 400,
			useNativeDriver: true,
		}).start();

		(async function () {
			try {
				if (!isGuest) {
					await Promise.all([cardsStore().fetchUserCards()]);
				}
				setLoading(false);
			} catch (e) {
				await userStore().logout();
				userStore().applyLogout();
			}

			// Animate content after loading completes
			Animated.timing(wrapperFadeAnim, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true,
			}).start();
		})();
	}, []);

	// Show animated loading indicator
	if (loading)
		return (
			<Animated.View
				style={{
					opacity: fadeAnim,
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<ActivityIndicator color={theme['--primary']} size='large' />
			</Animated.View>
		);

	// Redirect if user is not authenticated
	if (!authenticated) {
		return <Redirect href={'/(public)/auth'} />;
	}

	const Wrapper = !isGuest ? NotificationsWrapper : React.Fragment;

	return (
		<Wrapper>
			{/* Apply animation only to the View inside the wrapper */}
			<Animated.View
				style={{
					opacity: wrapperFadeAnim,
					transform: [
						{
							scale: wrapperFadeAnim.interpolate({
								inputRange: [0, 1],
								outputRange: [0.8, 1],
							}),
						},
					],
					flex: 1,
				}}
			>
				<Stack screenOptions={getBaseScreenLayout(theme)}>
					<Stack.Screen name='tabs' />
					<Stack.Screen name='edit_profile' />
					<Stack.Screen name='select_cards' />
					<Stack.Screen
						name='(modals)'
						options={{
							presentation: Platform.OS === 'android' ? 'card' : 'modal',
							...(Platform.OS === 'android'
								? { animation: 'slide_from_bottom' }
								: {}),
						}}
					/>
					<Stack.Screen
						name='(fullscreen_modals)'
						options={{
							presentation: 'transparentModal',
							animation: 'fade',
							contentStyle: {
								backgroundColor: 'transparent',
							},
						}}
					/>
				</Stack>
			</Animated.View>
		</Wrapper>
	);
});

export default PrivateLayout;
