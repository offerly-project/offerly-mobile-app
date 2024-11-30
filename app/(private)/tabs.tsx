import { Tabs } from "expo-router";

export const TabsScreen = () => {
	return (
		<Tabs>
			<Tabs.Screen name="home" />
			<Tabs.Screen name="cards" />
		</Tabs>
	);
};

export default TabsScreen;
