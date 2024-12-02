import { DEFAULT_SCREEN_LAYOUT } from '@/constants/screens';
import { ThemeContextProvider } from '@/contexts/ThemeContext';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css';

export default function RootLayout() {
	return (
		<ThemeContextProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<BottomSheetModalProvider>
					<Stack screenOptions={DEFAULT_SCREEN_LAYOUT}>
						<Stack.Screen name='(public)' />
						<Stack.Screen name='(private)' />
					</Stack>
				</BottomSheetModalProvider>
			</GestureHandlerRootView>
		</ThemeContextProvider>
	);
}
