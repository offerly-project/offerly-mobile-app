import { DEFAULT_SCREEN_LAYOUT } from "@/constants/screens";
import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
	return (
		<>
			<Stack screenOptions={DEFAULT_SCREEN_LAYOUT}>
				<Stack.Screen name="(public)" />
				<Stack.Screen name="(private)" />
			</Stack>
		</>
	);
}
