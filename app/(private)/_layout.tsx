import { userStore } from "@/stores";
import { Redirect, Stack, Tabs } from "expo-router";
import { observer } from "mobx-react-lite";

export const PrivateLayout = observer(() => {
	const { authenticated } = userStore();

	if (!authenticated) {
		return <Redirect href={"/(public)/login"} />;
	}

	return (
		<Tabs>
			<Stack.Screen name="tabs" />
			{/* <Stack.Screen name="tabs" /> */}
		</Tabs>
	);
});

export default PrivateLayout;
