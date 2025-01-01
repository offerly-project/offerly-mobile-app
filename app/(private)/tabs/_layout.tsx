import { useThemeStyles } from '@/hooks/useThemeStyles';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

export default function Layout() {
	const theme = useThemeStyles();

	return (
		<View style={{ flex: 1, backgroundColor: theme['--background'] }}>
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: theme['--primary'],
					headerShown: false,
					tabBarStyle: {
						backgroundColor: theme['--background'],
						borderTopWidth: 1,
						borderTopColor: theme['--background'],
						paddingTop: 6,
						height: 80,
					},
				}}
				initialRouteName='offers'
			>
				<Tabs.Screen
					name='offers'
					options={{
						title: 'Offers',
						tabBarIcon: ({ color }) => (
							<MaterialIcons size={28} name='discount' color={color} />
						),
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
					name='account'
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
