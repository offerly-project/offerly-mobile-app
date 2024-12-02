import { getBaseScreenLayout } from '@/constants/screens';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { userStore } from '@/stores';
import { Redirect, Stack } from 'expo-router';
import { observer } from 'mobx-react-lite';

export const PrivateLayout = observer(() => {
	const { authenticated } = userStore();
	const theme = useThemeStyles();
	if (!authenticated) {
		return <Redirect href={'/(public)/login'} />;
	}

	return (
		<Stack screenOptions={getBaseScreenLayout(theme)}>
			<Stack.Screen name='tabs' />
		</Stack>
	);
});

export default PrivateLayout;
