import NotificationsWrapper from '@/components/NotificationsWrapper';
import { getBaseScreenLayout } from '@/constants/screens';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { cardsStore, userStore } from '@/stores';
import { Redirect, Stack } from 'expo-router';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';

export const PrivateLayout = observer(() => {
	const { authenticated, isGuest } = userStore();
	const theme = useThemeStyles();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		(async function () {
			if (!isGuest) {
				await Promise.all([cardsStore().fetchUserCards()]);
			}
			setLoading(false);
		})();
	}, []);

	if (loading)
		return (
			<View className='h-full w-full flex-col items-center justify-center'>
				<ActivityIndicator color={theme['--primary']} />
			</View>
		);

	if (!authenticated) {
		return <Redirect href={'/(public)/auth'} />;
	}

	const Wrapper = !isGuest ? NotificationsWrapper : React.Fragment;

	return (
		<Wrapper>
			<Stack screenOptions={getBaseScreenLayout(theme)}>
				<Stack.Screen name='tabs' />
				<Stack.Screen name='edit_profile' />
				<Stack.Screen name='select_cards' />
				<Stack.Screen
					name='(modals)'
					options={{
						presentation: Platform.OS === 'android' ? 'card' : 'modal',
						...(Platform.OS === 'android' ? { animation: 'slide_from_bottom' } : {}),
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
		</Wrapper>
	);
});

export default PrivateLayout;
