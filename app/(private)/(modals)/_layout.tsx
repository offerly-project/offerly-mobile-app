import { getBaseScreenLayout } from '@/constants/screens';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { haptic } from '@/utils/utils';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import { useEffect } from 'react';

export default function ModalsLayout() {
	const theme = useThemeStyles();

	useEffect(() => {
		haptic('selection');
	}, []);

	return (
		<BottomSheetModalProvider>
			<Stack
				screenOptions={{
					...getBaseScreenLayout(theme),
					contentStyle: {
						backgroundColor: theme['--background'],
					},
				}}
			>
				<Stack.Screen
					name='change_password_modal'
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name='about_modal'
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name='terms_and_conditions_modal'
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name='contact_us_modal'
					options={{
						headerShown: false,
					}}
				/>
			</Stack>
		</BottomSheetModalProvider>
	);
}
