import Login from "@/templates/Login";
import { SafeAreaView } from "react-native-safe-area-context";

export const LoginScreen = () => {
	return (
		<SafeAreaView className="flex-1">
			<Login />
		</SafeAreaView>
	);
};

export default LoginScreen;
