import { getBaseScreenLayout } from '@/constants/screens';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { cardsStore, userStore } from '@/stores';
import { Redirect, Stack } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
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
	return (
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
		</Stack>
	);
});

export default PrivateLayout;
