import { userStore } from "@/stores";
import { Redirect } from "expo-router";
import { observer } from "mobx-react-lite";
import "../global.css";

export const Home = observer(() => {
	const authenticated = userStore().authenticated;

	return (
		<Redirect href={authenticated ? "./(private)/tabs" : "./(public)/login"} />
	);
});

export default Home;
