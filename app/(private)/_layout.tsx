import { userStore } from "@/stores";
import { Redirect, Stack } from "expo-router";
import { observer } from "mobx-react-lite";

export const PrivateLayout = observer(() => {
	const { authenticated } = userStore();

	if (!authenticated) {
		return <Redirect href={"/(public)/login"} />;
	}

	return (
		<Stack>
			<Stack.Screen name="tabs" />
		</Stack>
	);
});

export default PrivateLayout;
