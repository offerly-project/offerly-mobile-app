import { getBaseScreenLayout } from '@/constants/screens';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { cardsStore, userStore } from '@/stores';
import { Redirect, Stack } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export const PrivateLayout = observer(() => {
	const { authenticated } = userStore();
	const theme = useThemeStyles();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		Promise.all([cardsStore().fetchUserCards()]).then(() => setLoading(false));
	}, []);

	if (loading)
		return (
			<View className='h-full w-full flex-col items-center justify-center'>
				<ActivityIndicator color={theme['--primary-1']} />
			</View>
		);

	if (!authenticated) {
		return <Redirect href={'/(public)/login'} />;
	}
	return (
		<Stack screenOptions={getBaseScreenLayout(theme)}>
			<Stack.Screen name='tabs' />
			<Stack.Screen name='edit_profile' />
			<Stack.Screen
				name='(modals)'
				options={{
					presentation: 'modal',
				}}
			/>
		</Stack>
	);
});

export default PrivateLayout;
