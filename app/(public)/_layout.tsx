import { getAuthScreenLayout } from '@/constants/screens';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { userStore } from '@/stores';
import { Redirect, Stack } from 'expo-router';
import { observer } from 'mobx-react-lite';

export const PublicLayout = observer(() => {
	const { authenticated } = userStore();
	const theme = useThemeStyles();

	if (authenticated) {
		return <Redirect href='/(private)/tabs/offers' />;
	}

	return (
		<Stack screenOptions={getAuthScreenLayout(theme)}>
			<Stack.Screen name='login' />
			<Stack.Screen name='forgetPassword' />
			<Stack.Screen name='auth' />
			<Stack.Screen name='otp' />
			<Stack.Screen name='signup' />
		</Stack>
	);
});

export default PublicLayout;
