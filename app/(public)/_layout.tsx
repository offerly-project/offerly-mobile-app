import { DEFAULT_SCREEN_LAYOUT } from "@/constants/screens";
import { userStore } from "@/stores";
import { Redirect, Stack } from "expo-router";
import { observer } from "mobx-react-lite";

export const PublicLayout = observer(() => {
	const { authenticated } = userStore();

	if (authenticated) {
		return <Redirect href={"/(private)/tabs"} />;
	}

	return (
		<Stack screenOptions={DEFAULT_SCREEN_LAYOUT}>
			<Stack.Screen name="login" />
		</Stack>
	);
});

export default PublicLayout;
