import { DEFAULT_SCREEN_LAYOUT } from '@/constants/screens';
import { ThemeContextProvider } from '@/contexts/ThemeContext';
import { Stack } from 'expo-router';
import '../global.css';

export default function RootLayout() {
	return (
		<ThemeContextProvider>
			<Stack screenOptions={DEFAULT_SCREEN_LAYOUT}>
				<Stack.Screen name='(public)' />
				<Stack.Screen name='(private)' />
			</Stack>
		</ThemeContextProvider>
	);
}
