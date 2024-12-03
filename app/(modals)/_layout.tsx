import { getBaseScreenLayout } from '@/constants/screens';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';

export default function ModalsLayout() {
	const theme = useThemeStyles();
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
					name='select_cards_modal'
					options={{
						headerShown: true,
						headerTitle: 'Select Cards',
					}}
				/>
			</Stack>
		</BottomSheetModalProvider>
	);
}
