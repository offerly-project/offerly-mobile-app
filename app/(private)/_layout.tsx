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
	if (!authenticated) {
		return <Redirect href={'/(public)/login'} />;
	}
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

	return (
		<Stack screenOptions={getBaseScreenLayout(theme)}>
			<Stack.Screen name='tabs' />
		</Stack>
	);
});

export default PrivateLayout;
