import Logo from '@/assets/icons/logo-white.png';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { languageStore } from '@/stores';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import { Tabs } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { View } from 'react-native';

export const Layout = observer(() => {
	const theme = useThemeStyles();
	const { translations } = languageStore();

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
				initialRouteName={'offers'}
			>
				<Tabs.Screen
					name={'home'}
					options={{
						title: translations.tabs.home.tabName,
						tabBarIcon: ({ color }) => (
							<MaterialIcons size={28} name='home' color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name='cards'
					options={{
						title: translations.tabs.cards.tabName,
						tabBarIcon: ({ color }) => <Ionicons size={28} name='card' color={color} />,
					}}
				/>
				<Tabs.Screen
					name={'offers'}
					options={{
						tabBarItemStyle: {
							position: 'relative',
							top: -6,
						},
						title: translations.tabs.offers.tabName,
						tabBarIcon: ({ color }) => (
							<View className='rounded-full bg-primary items-center justify-center h-12 w-12 mb-6'>
								<Image
									source={Logo}
									style={{
										height: 18,
										width: 22,
									}}
								/>
							</View>
						),
					}}
				/>
				<Tabs.Screen
					name='favorites'
					options={{
						title: translations.tabs.favorites.tabName,
						tabBarIcon: ({ color }) => (
							<Ionicons size={28} name='heart' color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name='account'
					options={{
						title: translations.tabs.account.tabName,
						tabBarIcon: ({ color }) => (
							<Ionicons size={28} name='person' color={color} />
						),
					}}
				/>
			</Tabs>
		</View>
	);
});

export default Layout;
