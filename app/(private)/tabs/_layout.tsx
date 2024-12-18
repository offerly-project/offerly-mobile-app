import { useThemeStyles } from '@/hooks/useThemeStyles';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
	const theme = useThemeStyles();
	const { top } = useSafeAreaInsets();
	return (
		<View style={{ flex: 1, paddingTop: top, backgroundColor: theme['--background'] }}>
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: theme['--primary-1'],
					headerShown: false,
					tabBarStyle: {
						backgroundColor: theme['--background'],
						borderWidth: 1,
						borderTopColor: 'rgba(255,255,255,0.2)',
					},
					sceneStyle: {
						backgroundColor: theme['--background'],
					},
				}}
				initialRouteName='favorites'
			>
				<Tabs.Screen
					name='home'
					options={{
						title: 'Home',
						tabBarIcon: ({ color }) => <Ionicons size={28} name='home' color={color} />,
					}}
				/>
				<Tabs.Screen
					name='cards'
					options={{
						title: 'Cards',
						tabBarIcon: ({ color }) => <Ionicons size={28} name='card' color={color} />,
					}}
				/>
				<Tabs.Screen
					name='favorites'
					options={{
						title: 'Favorites',
						tabBarIcon: ({ color }) => (
							<Ionicons size={28} name='heart' color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name='accounts'
					options={{
						title: 'Account',
						tabBarIcon: ({ color }) => (
							<Ionicons size={28} name='person' color={color} />
						),
					}}
				/>
			</Tabs>
		</View>
	);
}
