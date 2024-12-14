import { getBaseScreenLayout } from '@/constants/screens';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { userStore } from '@/stores';
import { Redirect, Stack } from 'expo-router';
import { observer } from 'mobx-react-lite';

export const PublicLayout = observer(() => {
	const { authenticated } = userStore();
	const theme = useThemeStyles();

	if (authenticated) {
		return <Redirect href='/(private)/tabs/home' />;
	}

	return (
		<Stack screenOptions={getBaseScreenLayout(theme)}>
			<Stack.Screen name='login' />
			<Stack.Screen name='forgetPassword' />
			<Stack.Screen name='auth' />
		</Stack>
	);
});

export default PublicLayout;
